import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
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

    const beliefMasses = new Map<string, number>();
    symptomsData.forEach((symptom) => {
      symptom.diseases.forEach((ds) => {
        const diseaseName = ds.disease.name;
        const existingMass = beliefMasses.get(diseaseName) || 0;
        beliefMasses.set(diseaseName, existingMass + ds.probability);
      });
    });

    const totalMass = Array.from(beliefMasses.values()).reduce((sum, m) => sum + m, 0);
    if (totalMass > 0) {
      beliefMasses.forEach((mass, disease) => {
        beliefMasses.set(disease, mass / totalMass);
      });
    }

    function combineMasses(m1: Map<string, number>, m2: Map<string, number>): Map<string, number> {
      const combinedMasses = new Map<string, number>();
      let conflict = 0;

      m1.forEach((m1Value, d1) => {
        m2.forEach((m2Value, d2) => {
          if (d1 === d2) {
            const newMass = m1Value * m2Value;
            combinedMasses.set(d1, (combinedMasses.get(d1) || 0) + newMass);
          } else {
            conflict += m1Value * m2Value;
          }
        });
      });

      if (conflict < 1) {
        combinedMasses.forEach((mass, disease) => {
          combinedMasses.set(disease, mass / (1 - conflict));
        });
      }

      return combinedMasses;
    }

    let combinedMass = new Map(beliefMasses);
    symptomsData.forEach(() => {
      combinedMass = combineMasses(combinedMass, beliefMasses);
    });

    const belief = new Map<string, number>();
    combinedMass.forEach((mass, disease) => {
      belief.set(disease, mass);
    });

    let mostLikelyDisease: string | null = null;
    let highestBelief = 0;

    belief.forEach((bel, disease) => {
      if (bel > highestBelief) {
        mostLikelyDisease = disease;
        highestBelief = bel;
      }
    });

    const mostLikelyDiseaseRecord = mostLikelyDisease ? await prisma.disease.findUnique({ where: { name: mostLikelyDisease } }) : null;
    const mostLikelyDiseaseId = mostLikelyDiseaseRecord?.id ?? undefined;

    await prisma.consultation.create({
      data: {
        userId,
        userInput: symptoms,
        diseaseId: mostLikelyDiseaseId,
        results: Object.fromEntries(belief),
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

    const results = latestConsultation.results;
    let highestDisease = "Unknown";
    let highestValue = 0;
    let highestImage = "";
    const otherDiseases = [];

    for (const [disease, value] of Object.entries(results)) {
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

    return res.status(200).json({
      success: true,
      data: {
        id: latestConsultation.id,
        createdAt: latestConsultation.createdAt,
        disease: { name: highestDisease, value: highestValue, image: highestImage },
        otherDiseases,
        solutions: latestConsultation.disease?.solutions.map((s) => s.solution.description) || [],
        userInput: latestConsultation.userInput,
      },
    });
  } catch (error) {
    console.error("Error in disease diagnosis:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
