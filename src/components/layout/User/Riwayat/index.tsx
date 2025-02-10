"use client";

import CardMenu from "../../../fragments/CardMenu";
import Navbar from "../../../fragments/Navbar";
import Footer from "../../../fragments/Footer";
import TableRiwayat from "../../../fragments/Table/TableRiwayat";
import Hero from "../../../fragments/Hero";

const RiwayatLayout = () => {
  return (
    <>
      <div className="flex min-h-screen ">
        <CardMenu />
        <main className="flex-1 p-6 sm:ml-[260px]">
          <Navbar title="Riwayat Konsultasi" />
          <section className="mt-4">
            <Hero title="" subtitle="Page ini menyediakan rekam jejak  dari diagnosa yang telah Anda lakukan. Anda dapat menggunakan fitur ini untuk meninjau,  atau mencari informasi yang relevan." imageSrc="/icon-riwayat-olive.svg" />
          </section>
          <div className="flex flex-wrap gap-6">
            <div className="flex-[2] min-w-[300px]">
              <TableRiwayat />
            </div>
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
};

export default RiwayatLayout;
