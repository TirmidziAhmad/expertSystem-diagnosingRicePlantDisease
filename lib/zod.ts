import { object, string } from "zod";

export const LoginSchema = object({
 email: string().email("email tidak valid "),
  password: string()
    .min(8, "password harus lebih dari 8 karakter")
    .max(32, "password tidak boleh lebih dari 32 karakter"),
});

export const RegisSchema = object({
  name: string().min(1, "nama harus lebih dari 1 karakter"),
  email: string().email("email tidak valid "),
  password: string()
    .min(8, "password harus lebih dari 8 karakter")
    .max(32, "password tidak boleh lebih dari 32 karakter"),
  ConfirmPassword: string()
    .min(8, "password harus lebih dari 8 karakter")
    .max(32, "password tidak boleh lebih dari 32 karakter")  
}).refine((data) => data.password === data.ConfirmPassword, {
    message: "Password dan Konfirmasi Password harus sama",
    path: ["ConfirmPassword"]
});
