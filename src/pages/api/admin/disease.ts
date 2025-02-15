import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      // Get all diseases with symptoms & solutions or a single disease by ID
      const { id } = req.query;

      if (id) {
        const disease = await prisma.disease.findUnique({
          where: { id: Number(id) },
          include: {
            symptoms: { include: { symptom: true } },
            solutions: { include: { solution: true } },
          },
        });

        if (!disease) return res.status(404).json({ message: "Disease not found" });
        return res.status(200).json(disease);
      }

      const diseases = await prisma.disease.findMany({
        include: {
          symptoms: { include: { symptom: true } },
          solutions: { include: { solution: true } },
        },
      });

      return res.status(200).json(diseases);
    }

    if (req.method === "POST") {
      // Create a new disease with symptoms & solutions
      const { name, image, description, symptoms, solutions } = req.body;

      if (!name || !image || !description) {
        return res.status(400).json({ message: "Name, image, and description are required" });
      }

      const newDisease = await prisma.disease.create({
        data: {
          name,
          image,
          description,
          symptoms: {
            create:
              symptoms?.map((s: { symptomId: number; probability: number }) => ({
                symptomId: s.symptomId,
                probability: s.probability,
              })) || [],
          },
          solutions: {
            create:
              solutions?.map((s: { solutionId: number }) => ({
                solutionId: s.solutionId,
              })) || [],
          },
        },
        include: {
          symptoms: { include: { symptom: true } },
          solutions: { include: { solution: true } },
        },
      });

      return res.status(201).json(newDisease);
    }

    if (req.method === "PUT") {
      // Update a disease, including symptoms & solutions
      const { id, name, image, description, symptoms, solutions } = req.body;

      if (!id || !name || !image || !description) {
        return res.status(400).json({ message: "ID, name, image, and description are required" });
      }

      const updatedDisease = await prisma.disease.update({
        where: { id: Number(id) },
        data: {
          name,
          image,
          description,
          symptoms: {
            deleteMany: {}, // Clear existing symptoms
            create:
              symptoms?.map((s: { symptomId: number; probability: number }) => ({
                symptomId: s.symptomId,
                probability: s.probability,
              })) || [],
          },
          solutions: {
            deleteMany: {}, // Clear existing solutions
            create:
              solutions?.map((s: { solutionId: number }) => ({
                solutionId: s.solutionId,
              })) || [],
          },
        },
        include: {
          symptoms: { include: { symptom: true } },
          solutions: { include: { solution: true } },
        },
      });

      return res.status(200).json(updatedDisease);
    }

    if (req.method === "DELETE") {
      // Delete a disease
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: "ID is required" });
      }

      await prisma.disease.delete({
        where: { id: Number(id) },
      });

      return res.status(200).json({ message: "Disease deleted successfully" });
    }

    res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
