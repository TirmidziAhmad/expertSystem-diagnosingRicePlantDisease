import prisma from '@/lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query; // Extract userId from the dynamic URL parameter

  if (!userId) {
    return res.status(400).json({ error: 'User ID is required' });
  }

  try {
    // Fetch consultation history for the user with the dynamic userId
    const consultations = await prisma.consultation.findMany({
      where: {
        userId: parseInt(userId as string, 10),
      },
      include: {
        disease: true, // Optional: Include related disease details
        user: true, // Optional: Include user details
      },
    });

    if (!consultations.length) {
      return res.status(404).json({ message: 'No consultation history found for this user.' });
    }

    res.status(200).json(consultations);
  } catch (error) {
    console.error('Error fetching consultation history:', error);
    res.status(500).json({ error: 'Failed to fetch consultation history' });
  }
}
