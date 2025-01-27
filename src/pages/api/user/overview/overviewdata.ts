import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Count the number of diseases, symptoms, and knowledge entries
      const diseaseCount = await prisma.disease.count();
      const symptomCount = await prisma.symptom.count();
      const pengetahuanCount = await prisma.diseaseSymptom.count();

      res.status(200).json({
        diseases: diseaseCount,
        symptoms: symptomCount,
        pengetahuan: pengetahuanCount,
      });
    } catch (error) {
      console.error('Error fetching counts:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
