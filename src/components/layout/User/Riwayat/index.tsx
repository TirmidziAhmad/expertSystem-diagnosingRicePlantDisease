"use client";

import React from "react";
import CardMenu from "../../../fragments/CardMenu";
import Navbar from "../../../fragments/Navbar";
import Footer from "../../../fragments/Footer";
import TableRiwayat from "../../../fragments/Table/TableRiwayat";
import dynamic from "next/dynamic";

// Import dynamic untuk mencegah rendering di server
const DiseaseChart = dynamic(
  () => import("../../../fragments/Chart/DiseaseChart"),
  {
    ssr: false,
  }
);
const RiwayatLayout = () => {
  return (
    <>
      <div className="flex min-h-screen ">
        <CardMenu />
        <main className="flex-1 p-6 sm:ml-[260px]">
          <Navbar title="Riwayat Konsultasi" />
          <div className="flex flex-wrap gap-6">
          <div className="flex-[2] min-w-[300px]">
            <TableRiwayat />
          </div>
          <div className="flex-[1] min-w-[300px]">
            <DiseaseChart />
          </div>
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
};

export default RiwayatLayout;
