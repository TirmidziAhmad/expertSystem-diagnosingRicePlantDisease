"use server";
import { RegisSchema } from "./zod";
import { hashSync } from "bcrypt-ts";
import { prisma } from "./prisma";
import { redirect } from "next/navigation";

export const RegisCredentials = async (
  formData: FormData
) => {
  const validatedFields = RegisSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, email, password } = validatedFields.data
  const hashedPassword = hashSync(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })
  redirect("/User/Login");
  return { message: "Registrasi berhasil, silakan login!" }; // Tambahkan pesan sukses
  } catch (error) {
    return { error: "Gagal Mendaftar" };
  }
 
};
