"use client";
import React from "react";
import Cookies from "js-cookie";
//add module to push user to login after logout
import { useRouter } from "next/navigation";

interface NavbarProps {
  title: string;
}

const Navbar: React.FC<NavbarProps> = ({ title }) => {
  const router = useRouter();
  const handleLogoutButton = () => {
    Cookies.remove("token");
    router.push("/login");
  };
  return (
    <>
      <header className="flex items-center justify-between pb-4 border-b border-black">
        <h2 className="text-xl font-semibold">{title}</h2>
        <button className="bg-[#352802] text-white px-4 py-1 rounded hover:bg-[#4A3C18] font-semibold text-center " onClick={handleLogoutButton}>
          Logout
        </button>
      </header>
    </>
  );
};

export default Navbar;
