import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

type MassMap = Map<string, number>;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST requests allowed" });
  }

  const { symptoms, userId }: { symptoms: string[]; userId: number } = req.body;

  if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
    return res.status(400).json({ message: "Symptoms array is required" });
  }

  if (!userId || typeof userId !== "number") {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const symptomsData = await prisma.symptom.findMany({
      where: { code: { in: symptoms } },
      include: { diseases: { include: { disease: true } } },
    });

    if (symptomsData.length === 0) {
      return res.status(400).json({ message: "No matching symptoms found" });
    }

    // Buat fungsi untuk membuat belief mass dari 1 gejala
    function convertSymptomToMass(symptom: (typeof symptomsData)[0]): MassMap {
      const mass = new Map<string, number>();
      const total = symptom.diseases.reduce(
        (sum, ds) => sum + ds.probability,
        0
      );

      if (total === 0) return mass;

      symptom.diseases.forEach((ds) => {
        const prob = ds.probability / total;
        const name = ds.disease.name;
        mass.set(name, prob);
      });

      return mass;
    }

    // Gabungkan dua belief mass
    function combineMasses(m1: MassMap, m2: MassMap): MassMap {
      const combined = new Map<string, number>();
      let conflict = 0;

      m1.forEach((m1Val, d1) => {
        m2.forEach((m2Val, d2) => {
          const intersection = d1 === d2 ? d1 : null;

          if (intersection) {
            const existing = combined.get(intersection) || 0;
            combined.set(intersection, existing + m1Val * m2Val);
          } else {
            conflict += m1Val * m2Val;
          }
        });
      });

      if (conflict < 1) {
        combined.forEach((val, key) => {
          combined.set(key, val / (1 - conflict));
        });
      }

      return combined;
    }

    // Langkah utama: buat mass untuk setiap gejala lalu kombinasikan
    let combinedMass = convertSymptomToMass(symptomsData[0]);

    for (let i = 1; i < symptomsData.length; i++) {
      const nextMass = convertSymptomToMass(symptomsData[i]);
      combinedMass = combineMasses(combinedMass, nextMass);
    }

    // Ambil penyakit dengan nilai belief tertinggi
    let mostLikelyDisease: string | null = null;
    let highestBelief = 0;
    combinedMass.forEach((val, key) => {
      if (val > highestBelief) {
        highestBelief = val;
        mostLikelyDisease = key;
      }
    });

    const mostLikelyDiseaseRecord = mostLikelyDisease
      ? await prisma.disease.findUnique({ where: { name: mostLikelyDisease } })
      : null;

    const mostLikelyDiseaseId = mostLikelyDiseaseRecord?.id ?? undefined;

    // Simpan ke dalam database konsultasi
    await prisma.consultation.create({
      data: {
        userId,
        userInput: symptoms,
        diseaseId: mostLikelyDiseaseId,
        results: Object.fromEntries(combinedMass),
      },
    });

    const latestConsultation = await prisma.consultation.findFirst({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: {
        disease: {
          select: {
            name: true,
            image: true,
            solutions: {
              select: {
                solution: {
                  select: { description: true },
                },
              },
            },
          },
        },
      },
    });

    if (!latestConsultation) {
      return res.status(200).json({
        success: true,
        data: null,
        message: "No consultations found for this user",
      });
    }

    // Olah hasil untuk menampilkan penyakit tertinggi dan lainnya
    const results = latestConsultation.results;
    let highestDisease = "Unknown";
    let highestValue = 0;
    let highestImage = "";
    const otherDiseases = [];

    if (results && typeof results === "object" && !Array.isArray(results)) {
      for (const [disease, value] of Object.entries(results)) {
        if (typeof value === "number") {
          if (value > highestValue) {
            if (highestDisease !== "Unknown") {
              otherDiseases.push({ name: highestDisease, value: highestValue });
            }
            highestDisease = disease;
            highestValue = value;
            highestImage = latestConsultation.disease?.image || "";
          } else {
            otherDiseases.push({ name: disease, value });
          }
        }
      }
    }

    return res.status(200).json({
      success: true,
      data: {
        id: latestConsultation.id,
        createdAt: latestConsultation.createdAt,
        disease: {
          name: highestDisease,
          value: highestValue,
          image: highestImage,
        },
        otherDiseases,
        solutions:
          latestConsultation.disease?.solutions.map(
            (s) => s.solution.description
          ) || [],
        userInput: latestConsultation.userInput,
      },
    });
  } catch (error) {
    console.error("Error in disease diagnosis:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
