import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Extract userId from dynamic route
  const { userId } = req.query;

  try {
    // Validate userId existence and format
    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required',
      });
    }

    // Convert userId to a number
    const parsedUserId = parseInt(userId as string, 10);

    if (isNaN(parsedUserId)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid user ID format',
      });
    }

    // Fetch consultations from the database
    const consultations = await prisma.consultation.findMany({
      where: {
        userId: parsedUserId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    if (!consultations.length) {
      return res.status(200).json({
        success: true,
        data: [],
        message: 'No consultations found for this user',
      });
    }

    return res.status(200).json({
      success: true,
      data: consultations,
    });
  } catch (error) {
    console.error('Error fetching consultations:', error);
    return res.status(500).json({
      success: false,
      error: 'Internal server error',
    });
  }
}
