import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      // Fetch all diseases from the database
      const diseases = await prisma.disease.findMany({
        include: {
          symptoms: true, // Optionally include related symptoms for each disease
        },
      });

      // Check if any diseases are found
      if (!diseases.length) {
        return res.status(404).json({ message: 'No diseases found' });
      }

      res.status(200).json(diseases);
    } catch (error) {
      console.error('Error fetching diseases:', error);
      res.status(500).json({ error: 'Failed to fetch diseases' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
