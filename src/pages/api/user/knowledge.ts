import prisma from "@/lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      // Fetch all diseases with simplified symptom and solution descriptions
      const diseases = await prisma.disease.findMany({
        select: {
          id: true,
          name: true,
          image: true,
          description: true,
          symptoms: {
            select: {
              symptom: {
                select: {
                  description: true,
                },
              },
            },
          },
          solutions: {
            select: {
              solution: {
                select: {
                  description: true,
                },
              },
            },
          },
        },
      });

      // Transform the data to a simpler format
      const formattedDiseases = diseases.map((disease) => ({
        id: disease.id,
        name: disease.name,
        image: disease.image,
        description: disease.description,
        symptoms: disease.symptoms.map((s) => s.symptom.description),
        solutions: disease.solutions.map((s) => s.solution.description),
      }));

      // Check if any diseases are found
      if (!formattedDiseases.length) {
        return res.status(404).json({ message: "No diseases found" });
      }

      res.status(200).json(formattedDiseases);
    } catch (error) {
      console.error("Error fetching diseases:", error);
      res.status(500).json({ error: "Failed to fetch diseases" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
