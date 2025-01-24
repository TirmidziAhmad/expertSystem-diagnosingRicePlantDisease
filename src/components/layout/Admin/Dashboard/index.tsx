"use client";

import React from "react";
import SidebarAdmin from "../../../fragments/SidebarAdmin";
import Navbar from "../../../fragments/Navbar";
import Footer from "../../../fragments/Footer";
import Link from 'next/link';
const DashboardLayout: React.FC = () => {
  return (
    <>
      <div className="flex min-h-screen">
        <SidebarAdmin />
        <main className="flex-1 p-6 sm:ml-[260px]">
          <Navbar title="Overview Dashboard"/>
          <section className="mt-4">
          <div className="bg-dark p-6 rounded-xl text-white ">
            <h1 className="text-2xl font-semibold">Data Gejala</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi adipisci similique dolor eveniet sequi numquam ratione vero provident ad facere quam minima reiciendis hic commodi expedita, magni cupiditate maxime vel.</p>
            <i>
            <Link 
              href="/admin/gejala"
              className="text-sm mt-2 font-bold">Lihat selengkapnya...</Link>
            </i> 
          </div>
          </section>

          <section className="mt-4">
          <div className="bg-olive p-6 rounded-xl text-white ">
            <h1 className="text-2xl font-semibold">Data Penyakit</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi adipisci similique dolor eveniet sequi numquam ratione vero provident ad facere quam minima reiciendis hic commodi expedita, magni cupiditate maxime vel.</p>
            <i>
            <Link 
              href="/admin/penyakit"
              className="text-sm mt-2 font-bold">Lihat selengkapnya...</Link>
            </i> 
          </div>
          </section>

          <section className="mt-4">
          <div className="bg-sand p-6 rounded-xl text-white ">
            <h1 className="text-2xl font-semibold">Data Relasi</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eligendi adipisci similique dolor eveniet sequi numquam ratione vero provident ad facere quam minima reiciendis hic commodi expedita, magni cupiditate maxime vel.</p>
            <i>
            <Link 
              href="/admin/relasi"
              className="text-sm mt-2 font-bold">Lihat selengkapnya...</Link>
            </i> 
          </div>
          </section>
          <Footer />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
