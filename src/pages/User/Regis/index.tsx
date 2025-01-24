"use client";

import { useFormState } from "react-dom";
import Link from "next/link";
import { RegisCredentials } from "../../../../lib/action";
import { useState } from "react";

const RegisPage = () => {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    const result = await RegisCredentials(formData);

    if (result?.error) {
      setErrors(result.error); // Tampilkan error
    } else if (result?.message) {
      setMessage(result.message); // Tampilkan pesan sukses/gagal
    }
  };


  return (
    <div className=" flex justify-center items-center bg-cover">
      <img src="/regis-ilustration.svg" className="w-[88vh] mr-40" />
      <form
        action={handleSubmit}
        className="text-olive border-beige border rounded-md p-8 shadow-2xl backdrop-filter backdrop-blur-sm bg-opacity-40 relative "
      >
        <h1 className="font-bold text-4xl text-center mb-6">Daftar Akun</h1>
        {message && (
          <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100" role="alert">
            <span className="font-medium">{message}</span>
          </div>
        )}
        <div>
          <div className="relative my-4">
            <label htmlFor="name">Username</label>
            <input
              type="text"
              name="name"
              placeholder="jazz"
              className="mt-2 block w-72 py-2.3 px-0 text-sm bg-transparent border-0 border-b border-beige appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus-text-black focus-border-blue-600 peer"
            />
            <div aria-live="polite" aria-atomic="true">
            {errors.name && <span className="text-sm text-red-500 mt-2">{errors.name}</span>}
            </div>
          </div>
          <div className="relative my-4">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="jazz@gmail.com"
              className="mt-2 block w-72 py-2.3 px-0 text-sm bg-transparent border-0 border-b border-beige appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus-text-black focus-border-blue-600 peer"
            />
            <div aria-live="polite" aria-atomic="true">
            {errors.email && <span className="text-sm text-red-500 mt-2">{errors.email}</span>}
            </div>
          </div>

          <div className="relative my-4">
            <label htmlFor="password">Password </label>
            <input
              type="password"
              name="password"
              placeholder="********"
              className="mt-2 block w-72 py-2.3 px-0 text-sm bg-transparent border-0 border-b border-beige appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus-text-black focus-border-blue-600 peer"
            />
            <div aria-live="polite" aria-atomic="true">
            {errors.password && <span className="text-sm text-red-500 mt-2">{errors.password}</span>}
            </div>
          </div>
          <div className="relative my-4">
            <label htmlFor="ConfirmPassword">Confirm Password </label>
            <input
              type="password"
              name="ConfirmPassword"
              placeholder="********"
              className="mt-2 block w-72 py-2.3 px-0 text-sm bg-transparent border-0 border-b border-beige appearance-none dark:focus:border-green-500 focus:outline-none focus:ring-0 focus-text-black focus-border-blue-600 peer"
            />
            <div aria-live="polite" aria-atomic="true">
            {errors.ConfirmPassword && (
              <span className="text-sm text-red-500 mt-2">{errors.ConfirmPassword}</span>
            )}
            </div>
          </div>
          <button
            type="submit"
            className="mt-2 bg-olive font-medium text-white text-center w-full px-2 py-2 rounded-md"
          >
            Daftar
          </button>
          <div className="flex flex-row text-sm item-center text-center justify-center mt-4">
            <p>
              Apakah sudah punya akun?
              <Link href="/User/Login" className="font-semibold">
                <span>Masuk disini</span>
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegisPage;
