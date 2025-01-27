import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Fetch all symptoms from the database
      const symptoms = await prisma.symptom.findMany();

      res.status(200).json(symptoms);
    } catch (error) {
      console.error('Error fetching symptoms:', error);
      res.status(500).json({ error: 'Failed to fetch symptoms' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
