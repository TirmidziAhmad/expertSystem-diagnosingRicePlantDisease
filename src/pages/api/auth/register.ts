import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcrypt';
import prisma from '../../../lib/prisma'; // Assuming you've set up Prisma client in lib/prisma.ts
import { z } from 'zod';

// Zod schema for validation
const registrationSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  username: z.string().min(4, { message: 'Username must be at least 4 characters long' }),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
});

type RegistrationInput = z.infer<typeof registrationSchema>;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      // Validate input with Zod schema
      const body: RegistrationInput = registrationSchema.parse(req.body);

      const { username, email, password } = body; // Destructure after validation

      // Check if email already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
      if (existingUser) {
        return res.status(400).json({ message: 'Email already exists' });
      }

      // Hash the password before saving
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
          roleId: 2,
        },
      });

      // Send response
      return res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      // Handle Zod validation errors
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: 'Validation error', errors: error.errors });
      }

      // Handle other errors
      return res.status(500).json({ message: 'Internal server error', error: error });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
}
