"use client";

import React, { useState } from "react";
import SidebarAdmin from "../../../fragments/SidebarAdmin";
import Navbar from "../../../fragments/Navbar";
import Footer from "../../../fragments/Footer";
import TablePenyakit from "../../../fragments/Table/TablePenyakit";
import { FaPlus, FaSearch, FaBackspace, FaSave } from "react-icons/fa";
import ButtonElement from "../../../elements/ButtonElement";
import InputElement from "../../../elements/InputElement";

const PenyakitLayout: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };



  return (
    <>
      <div className="flex min-h-screen">
        <SidebarAdmin />
        <main  className={`flex-1 p-6 sm:ml-[260px] transition-all ${
            isModalOpen ? "brightness-50" : ""
          }`}>
          <Navbar title="Overview Penyakit" />
          <section className="mt-4">
            <div className="flex flex-row justify-between">
              <ButtonElement
                bg="bg-sand"
                label="Tambah Data Penyakit"
                icon={FaPlus}
                variant="outline"
                colorScheme="teal"
                link="/admin/tambahpenyakit"
              />
              <div className="flex items-center">
                <InputElement
                  icon={FaSearch}
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </div>
            </div>
            <TablePenyakit searchQuery={searchQuery} />
          </section>
          <Footer />
        </main>
      </div>
    </>
  );
};

export default PenyakitLayout;
