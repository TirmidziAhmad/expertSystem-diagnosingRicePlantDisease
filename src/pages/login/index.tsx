/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      setError(null);
      const response = await axios.post("/api/auth/login", { email, password });

      if (response.status === 200) {
        const { token } = response.data;
        const { username, role, userId } = response.data.user;
        Cookies.set("token", token, { expires: 1 / 24 });
        Cookies.set("userId", userId);
        Cookies.set("username", username, { expires: 1 / 24 });
        Cookies.set("role", role, { expires: 1 / 24 });
        if (role === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/user/dashboard");
        }
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-around items-center bg-cover h-screen">
      <div className="text-olive border-beige border rounded-md p-8 shadow-2xl backdrop-filter backdrop-blur-sm bg-opacity-40 ">
        <h1 className="font-bold text-4xl text-center mb-6">Masuk</h1>
        {error && <div className="text-red-600 mb-4 text-center text-sm">{error}</div>}
        <div>
          <div className="relative my-4">
            <label htmlFor="username">Email</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 block w-72 py-2.3 px-0 text-sm bg-transparent border-0 border-b border-beige appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus-text-black focus-border-blue-600 peer"
              required
            />
          </div>
          <div className="relative my-4">
            <label htmlFor="password">Password </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 block w-72 py-2.3 px-0 text-sm bg-transparent border-0 border-b border-beige appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus-text-black focus-border-blue-600 peer"
              required
            />
          </div>
          <button onClick={handleLogin} className="mt-2 bg-[#352802] font-medium text-white text-center w-full px-2 py-2 rounded-md">
            Masuk
          </button>
          <div className="flex flex-row text-sm item-center text-center justify-center mt-4 gap-1">
            <p>Apakah belum punya akun? </p>
            <p className="font-semibold text-[#352802]">
              <Link href="/register">{" Daftar disini"}</Link>
            </p>
          </div>
        </div>
      </div>
      <Image src="/login-ilustration.jpg" alt="Login Illustration" width={800} height={800} className=" mt-5" />
    </div>
  );
};

export default LoginPage;
