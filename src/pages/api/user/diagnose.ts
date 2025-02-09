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
    // Step 1: Fetch symptoms and related diseases
    const symptomsData = await prisma.symptom.findMany({
      where: { code: { in: symptoms } },
      include: { diseases: { include: { disease: true } } },
    });

    if (symptomsData.length === 0) {
      return res.status(400).json({ message: "No matching symptoms found" });
    }

    // Step 2: Assign belief masses (m values)
    const beliefMasses = new Map<string, number>();

    symptomsData.forEach((symptom) => {
      symptom.diseases.forEach((ds) => {
        const diseaseName = ds.disease.name;
        const existingMass = beliefMasses.get(diseaseName) || 0;
        beliefMasses.set(diseaseName, existingMass + ds.probability);
      });
    });

    // Normalize belief masses
    const totalMass = Array.from(beliefMasses.values()).reduce((sum, m) => sum + m, 0);
    if (totalMass > 0) {
      beliefMasses.forEach((mass, disease) => {
        beliefMasses.set(disease, mass / totalMass);
      });
    }

    // Step 3: Apply Dempster’s Rule of Combination
    function combineMasses(m1: Map<string, number>, m2: Map<string, number>): Map<string, number> {
      const combinedMasses = new Map<string, number>();
      let conflict = 0;

      m1.forEach((m1Value, d1) => {
        m2.forEach((m2Value, d2) => {
          if (d1 === d2) {
            const newMass = m1Value * m2Value;
            combinedMasses.set(d1, (combinedMasses.get(d1) || 0) + newMass);
          } else {
            conflict += m1Value * m2Value; // Conflict mass (K factor)
          }
        });
      });

      // Normalize masses to account for conflict
      if (conflict < 1) {
        combinedMasses.forEach((mass, disease) => {
          combinedMasses.set(disease, mass / (1 - conflict));
        });
      }

      return combinedMasses;
    }

    // Apply DST combination on symptoms
    let combinedMass = new Map(beliefMasses);
    symptomsData.forEach(() => {
      combinedMass = combineMasses(combinedMass, beliefMasses);
    });

    // Step 4: Compute belief and plausibility
    const belief = new Map<string, number>();
    const plausibility = new Map<string, number>();

    combinedMass.forEach((mass, disease) => {
      belief.set(disease, mass);
      let plausibilitySum = mass;
      combinedMass.forEach((otherMass, otherDisease) => {
        if (disease !== otherDisease) {
          plausibilitySum += otherMass;
        }
      });
      plausibility.set(disease, plausibilitySum);
    });

    // Step 5: Find the most likely disease based on belief
    let mostLikelyDisease: string | null = null;
    let highestBelief = 0;

    belief.forEach((bel, disease) => {
      if (bel > highestBelief) {
        mostLikelyDisease = disease;
        highestBelief = bel;
      }
    });

    // Fetch the most likely disease ID
    const mostLikelyDiseaseRecord = mostLikelyDisease ? await prisma.disease.findUnique({ where: { name: mostLikelyDisease } }) : null;
    const mostLikelyDiseaseId = mostLikelyDiseaseRecord?.id ?? undefined;

    // Step 6: Store the consultation in the database
    const consultation = await prisma.consultation.create({
      data: {
        userId,
        userInput: symptoms,
        diseaseId: mostLikelyDiseaseId,
        results: Object.fromEntries(belief),
      },
    });

    res.status(200).json({
      mostLikelyDisease,
      highestBelief,
      beliefValues: Object.fromEntries(belief),
      plausibilityValues: Object.fromEntries(plausibility),
    });
  } catch (error) {
    console.error("Error in disease diagnosis:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
