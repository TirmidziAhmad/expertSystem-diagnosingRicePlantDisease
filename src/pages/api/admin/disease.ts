import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import {
  IncomingForm,
  Files,
  Fields,
  File as FormidableFile,
} from "formidable";
import { writeFile, readFile as fsReadFile } from "fs/promises";
import path from "path";
import { v4 as uuidv4 } from "uuid";

interface FormidableFileWithMeta extends FormidableFile {
  originalFilename: string | null;
  filepath: string;
  toBuffer?: () => Promise<Buffer>;
}

type SymptomInput = {
  symptomId: number;
  probability: number;
};

type SolutionInput = {
  solutionId: number;
};

type ParsedFormData = {
  image: string;
  name: string;
  description: string;
  symptoms: SymptomInput[];
  solutions: SolutionInput[];
};

const prisma = new PrismaClient();

export const config = {
  api: {
    bodyParser: false,
  },
};

async function parseFormData(req: NextApiRequest): Promise<ParsedFormData> {
  const form = new IncomingForm({ keepExtensions: true, multiples: true });
  return new Promise((resolve, reject) => {
    form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
      if (err) return reject(err);

      try {
        const name =
          typeof fields.name === "string"
            ? fields.name
            : Array.isArray(fields.name)
            ? fields.name[0]
            : "";
        const description =
          typeof fields.description === "string"
            ? fields.description
            : Array.isArray(fields.description)
            ? fields.description[0]
            : "";
        const symptoms: SymptomInput[] = JSON.parse(
          typeof fields.symptoms === "string"
            ? fields.symptoms
            : Array.isArray(fields.symptoms)
            ? fields.symptoms[0]
            : "[]"
        );
        const solutions: SolutionInput[] = JSON.parse(
          typeof fields.solutions === "string"
            ? fields.solutions
            : Array.isArray(fields.solutions)
            ? fields.solutions[0]
            : "[]"
        );

        let imagePath = "";

        const fileInput = files.image;
        const file = (
          Array.isArray(fileInput) ? fileInput[0] : fileInput
        ) as FormidableFileWithMeta;

        if (file && file.filepath && file.originalFilename) {
          const fileName = `${uuidv4()}-${file.originalFilename}`;
          const destPath = path.join(process.cwd(), "public/uploads", fileName);
          const data = await fsReadFile(file.filepath);
          await writeFile(destPath, data);
          imagePath = `/uploads/${fileName}`;
        }

        resolve({ image: imagePath, name, description, symptoms, solutions });
      } catch (parseError) {
        reject(parseError);
      }
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    switch (req.method) {
      case "GET": {
        const diseases = await prisma.disease.findMany({
          include: {
            symptoms: { include: { symptom: true } },
            solutions: { include: { solution: true } },
          },
        });
        return res.status(200).json(diseases);
      }

      case "POST": {
        const { image, name, description, symptoms, solutions } =
          await parseFormData(req);

        const disease = await prisma.disease.create({
          data: {
            image,
            name,
            description,
            symptoms: {
              create: symptoms.map((s) => ({
                symptomId: s.symptomId,
                probability: s.probability,
              })),
            },
            solutions: {
              create: solutions.map((s) => ({
                solutionId: s.solutionId,
              })),
            },
          },
          include: {
            symptoms: { include: { symptom: true } },
            solutions: { include: { solution: true } },
          },
        });

        return res.status(200).json(disease);
      }

      case "PUT": {
        const body = req.body as {
          id: number;
          image: string;
          name: string;
          description: string;
          symptoms: SymptomInput[];
          solutions: SolutionInput[];
        };

        const { id, image, name, description, symptoms, solutions } = body;

        await prisma.diseaseSymptom.deleteMany({ where: { diseaseId: id } });
        await prisma.diseaseSolution.deleteMany({ where: { diseaseId: id } });

        const updatedDisease = await prisma.disease.update({
          where: { id },
          data: {
            image,
            name,
            description,
            symptoms: {
              create: symptoms.map((s) => ({
                symptomId: s.symptomId,
                probability: s.probability,
              })),
            },
            solutions: {
              create: solutions.map((s) => ({
                solutionId: s.solutionId,
              })),
            },
          },
          include: {
            symptoms: { include: { symptom: true } },
            solutions: { include: { solution: true } },
          },
        });

        return res.status(200).json(updatedDisease);
      }

      case "DELETE": {
        const { id } = req.query;
        if (!id || Array.isArray(id)) {
          return res.status(400).json({ error: "Invalid disease ID" });
        }

        const diseaseId = parseInt(id);
        if (isNaN(diseaseId)) {
          return res.status(400).json({ error: "Invalid disease ID" });
        }

        await prisma.diseaseSymptom.deleteMany({ where: { diseaseId } });
        await prisma.diseaseSolution.deleteMany({ where: { diseaseId } });
        await prisma.consultation.updateMany({
          where: { diseaseId },
          data: { diseaseId: null },
        });
        const deleted = await prisma.disease.delete({
          where: { id: diseaseId },
        });

        return res
          .status(200)
          .json({ message: "Disease deleted successfully", deleted });
      }

      default:
        return res.status(405).json({ error: "Method not allowed" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server error" });
  }
}
