import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    // Fetch consultations with related disease names
    const consultations = await prisma.consultation.findMany({
      select: {
        createdAt: true,
        disease: {
          select: {
            name: true,
          },
        },
      },
      where: {
        diseaseId: { not: null },
      },
    });

    // Grouping data by month and summing disease occurrences
    const groupedData = consultations.reduce((acc, { disease, createdAt }) => {
      const month = createdAt.toISOString().slice(0, 7); // Format YYYY-MM
      const diseaseName = disease?.name ?? "Unknown Disease"; // Handle cases where disease is null

      if (!acc[month]) acc[month] = {};
      if (!acc[month][diseaseName]) acc[month][diseaseName] = 0;

      acc[month][diseaseName] += 1;
      return acc;
    }, {} as Record<string, Record<string, number>>);

    res.status(200).json(groupedData);
  } catch (error) {
    console.error("Error fetching solutions:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
