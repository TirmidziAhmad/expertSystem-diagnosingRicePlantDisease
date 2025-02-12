import type { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Cookies from "cookies";
import prisma from "@/lib/prisma";

interface LoginRequest {
  email: string;
  password: string;
}

const loginHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { email, password }: LoginRequest = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      include: { role: true },
    });

    if (!user) {
      return res.status(401).json({ message: "Email atau password tidak valid" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Email atau password tidak valid" });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not set in the environment variables.");
    }

    const token = jwt.sign(
      {
        userId: user.id,
        email: user.email,
        roleId: user.roleId,
        roleName: user.role.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Store JWT in secure HTTP-only cookie
    const cookies = new Cookies(req, res);
    cookies.set("token", token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    cookies.set("role", user.role.name, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      user: {
        userId: user.id,
        email: user.email,
        username: user.username,
        role: user.role.name,
      },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default loginHandler;
