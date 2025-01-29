import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { symptoms, userId }: { symptoms: string[]; userId: number } = req.body;

  if (!symptoms || !Array.isArray(symptoms) || symptoms.length === 0) {
    return res.status(400).json({ message: 'Symptoms array is required' });
  }

  try {
    // Step 1: Fetch symptoms and related diseases
    const symptomsData = await prisma.symptom.findMany({
      where: {
        code: { in: symptoms },
      },
      include: {
        diseases: {
          include: { disease: true },
        },
      },
    });

    if (symptomsData.length === 0) {
      return res.status(400).json({ message: 'No matching symptoms found' });
    }

    // Step 2: Calculate disease probabilities using the Dempster-Shafer method
    const diseaseProbabilities = new Map<string, number>();

    symptomsData.forEach((symptom) => {
      symptom.diseases.forEach((ds) => {
        const currentProb = diseaseProbabilities.get(ds.disease.name) || 1.0;
        diseaseProbabilities.set(ds.disease.name, currentProb * ds.probability);
      });
    });

    // Normalize probabilities
    let totalProbability = Array.from(diseaseProbabilities.values()).reduce((sum, prob) => sum + prob, 0);

    if (totalProbability > 0) {
      diseaseProbabilities.forEach((prob, disease) => {
        diseaseProbabilities.set(disease, prob / totalProbability);
      });
    }

    // Find the most likely disease
    let mostLikelyDisease: string | null = null;
    let highestProbability = 0;

    diseaseProbabilities.forEach((probability, disease) => {
      if (probability > highestProbability) {
        mostLikelyDisease = disease;
        highestProbability = probability;
      }
    });

    // Fetch the most likely disease ID
    const mostLikelyDiseaseRecord = mostLikelyDisease ? await prisma.disease.findUnique({ where: { name: mostLikelyDisease } }) : null;

    const mostLikelyDiseaseId = mostLikelyDiseaseRecord?.id ?? undefined;

    // Step 3: Store the consultation and results in the JSON field
    const consultation = await prisma.consultation.create({
      data: {
        userId,
        userInput: symptoms,
        diseaseId: mostLikelyDiseaseId,
        results: Object.fromEntries(diseaseProbabilities),
      },
    });

    res.status(200).json({
      mostLikelyDisease,
      highestProbability,
      allProbabilities: Object.fromEntries(diseaseProbabilities),
    });
  } catch (error) {
    console.error('Error in disease diagnosis:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
