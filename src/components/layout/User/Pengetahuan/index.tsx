"use client";

import CardMenu from "../../../fragments/CardMenu";
import Navbar from "../../../fragments/Navbar";
import Footer from "../../../fragments/Footer";
import CardPengetahuan from "../../../fragments/CardPengetahuan";
import Hero from "@/components/fragments/Hero";
import { useState, useEffect } from "react";
import axios from "axios";

interface DataItem {
  id: number;
  name: string;
  image: string;
  description: string;
}

const PengetahuanLayout = () => {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/user/knowledge");
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div className="flex min-h-screen ">
        <CardMenu />
        <main className="flex-1 p-6 sm:ml-[260px]">
          <Navbar title="Overview Pengetahuan" />
          <section className="mt-4">
            <Hero title="" subtitle="Tambah wawasan mendalam tentang berbagai penyakit, gejala, penyebab, dan pencegahannya mengenai tanaman padi." imageSrc="/icon-pengetahuan-olive.svg" />
          </section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4">
            {data.map((item) => (
              <CardPengetahuan key={item.id} title={item.name} description={item.description} />
            ))}
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
};

export default PengetahuanLayout;
