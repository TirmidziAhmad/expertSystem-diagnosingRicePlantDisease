import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      // Get all symptoms or a single symptom by ID
      const { id } = req.query;

      if (id) {
        const symptom = await prisma.symptom.findUnique({
          where: { id: Number(id) },
        });
        if (!symptom) return res.status(404).json({ message: "Symptom not found" });
        return res.status(200).json(symptom);
      }

      const symptoms = await prisma.symptom.findMany();
      return res.status(200).json(symptoms);
    }

    if (req.method === "POST") {
      // Create a new symptom
      const { code, description } = req.body;

      if (!code || !description) {
        return res.status(400).json({ message: "Code and description are required" });
      }

      const newSymptom = await prisma.symptom.create({
        data: { code, description },
      });

      return res.status(201).json(newSymptom);
    }

    if (req.method === "PUT") {
      // Update a symptom
      const { id, code, description } = req.body;

      if (!id || !code || !description) {
        return res.status(400).json({ message: "ID, code, and description are required" });
      }

      const updatedSymptom = await prisma.symptom.update({
        where: { id: Number(id) },
        data: { code, description },
      });

      return res.status(200).json(updatedSymptom);
    }

    if (req.method === "DELETE") {
      // Delete a symptom
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: "ID is required" });
      }

      await prisma.symptom.delete({
        where: { id: Number(id) },
      });

      return res.status(200).json({ message: "Symptom deleted successfully" });
    }

    res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
