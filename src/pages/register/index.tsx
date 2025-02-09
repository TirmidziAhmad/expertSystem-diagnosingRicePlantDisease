/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import axios from "axios";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

interface FormData {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}

const RegisPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setSuccess(null);

    if (formData.password !== formData.confirmPassword) {
      setErrors(["Passwords do not match!"]);
      return;
    }

    try {
      const response = await axios.post("/api/auth/register", {
        email: formData.email,
        username: formData.username,
        password: formData.password,
      });

      if (response.status === 201) {
        setSuccess("Registration successful! Redirecting to login...");
        router.push("/login");
      }
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors.map((error: any) => error.message));
      } else {
        setErrors(["Registration failed!"]);
      }
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="w-1/2">
        <Image src="/regis-ilustration.svg" className="w-[88vh] mr-40" alt="Registration Illustration" width={500} height={500} />
      </div>

      <div className="text-olive border-beige border rounded-md p-8 shadow-2xl backdrop-filter backdrop-blur-sm bg-opacity-40 ">
        <h1 className="font-bold text-4xl text-center mb-6">Daftar Akun</h1>
        <form onSubmit={handleSubmit}>
          <div className=" my-4">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className="mt-2 block w-72 py-2.3 px-0 text-sm bg-transparent border-0 border-b border-beige appearance-none focus:outline-none peer" required />
          </div>
          <div className=" my-4">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="mt-2 block w-72 py-2.3 px-0 text-sm bg-transparent border-0 border-b border-beige appearance-none focus:outline-none peer"
              required
            />
          </div>
          <div className=" my-4">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="mt-2 block w-72 py-2.3 px-0 text-sm bg-transparent border-0 border-b border-beige appearance-none focus:outline-none peer"
              required
            />
          </div>
          <div className=" my-4">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="mt-2 block w-72 py-2.3 px-0 text-sm bg-transparent border-0 border-b border-beige appearance-none focus:outline-none peer"
              required
            />
          </div>

          {/* Display Errors */}
          {errors.length > 0 && (
            <div className="text-red-500 text-sm mb-4">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}

          {/* Display Success Message */}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <button type="submit" className="mt-2 bg-[#352802] font-medium text-white text-center w-full px-2 py-2 rounded-md">
            Daftar
          </button>
        </form>
        <div className="flex flex-row text-sm item-center text-center justify-center mt-4 gap-1">
          <p>Apakah sudah punya akun?</p>
          <Link href="/login" className="font-semibold text-[#352802]">
            Masuk disini
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisPage;
