"use client";

import React, { useState } from "react";
import SidebarAdmin from "../../../fragments/SidebarAdmin";
import Navbar from "../../../fragments/Navbar";
import Footer from "../../../fragments/Footer";
import TambahPenyakit from "../../../fragments/Form/FormTambahPenyakit";
import { FaPlus, FaSearch, FaBackspace, FaSave } from "react-icons/fa";
import ButtonElement from "../../../elements/ButtonElement";

const TambahPenyakitLayout: React.FC = () => {
  return (
    <>
      <div className="flex min-h-screen">
        <SidebarAdmin />
        <main  className={`flex-1 p-6 sm:ml-[260px] transition-all`}>
          <Navbar title="Tambah Data Penyakit" />
          <section className="mt-4">
            <TambahPenyakit />
            <div className="flex mt-4 gap-2">
              <ButtonElement
                bg="bg-blue"
                label="Kembali"
                icon={FaBackspace}
                variant="outline"
              />
              <ButtonElement
                bg="bg-green"
                label="Simpan"
                icon={FaSave}
                variant="outline"
              />
            </div>
          </section>
          <Footer />
        </main>
      </div>
    </>
  );
};

export default TambahPenyakitLayout;
