import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "GET") {
      // Get all solutions
      const solutions = await prisma.solution.findMany();
      return res.status(200).json(solutions);
    }

    if (req.method === "POST") {
      // Create a new solution
      const { description } = req.body;

      if (!description) {
        return res.status(400).json({ message: "Description is required" });
      }

      const newSolution = await prisma.solution.create({
        data: { description },
      });

      return res.status(201).json(newSolution);
    }

    if (req.method === "PUT") {
      // Update a solution
      const { id, description } = req.body;

      if (!id || !description) {
        return res.status(400).json({ message: "ID and description are required" });
      }

      const updatedSolution = await prisma.solution.update({
        where: { id: Number(id) },
        data: { description },
      });

      return res.status(200).json(updatedSolution);
    }

    if (req.method === "DELETE") {
      // Delete a solution
      const { id } = req.body;

      if (!id) {
        return res.status(400).json({ message: "ID is required" });
      }

      await prisma.solution.delete({
        where: { id: Number(id) },
      });

      return res.status(200).json({ message: "Solution deleted successfully" });
    }

    res.status(405).json({ message: "Method Not Allowed" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
