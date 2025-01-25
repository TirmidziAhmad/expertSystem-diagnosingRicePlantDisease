"use client";

import React, { useState } from "react";
import SidebarAdmin from "../../../fragments/SidebarAdmin";
import Navbar from "../../../fragments/Navbar";
import Footer from "../../../fragments/Footer";
import TableGejala from "../../../fragments/Table/TabelGejala";
import { FaPlus, FaSearch, FaBackspace, FaSave } from "react-icons/fa";
import ButtonElement from "../../../elements/ButtonElement";
import InputElement from "../../../elements/InputElement";

const GejalaLayout: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex min-h-screen">
        <SidebarAdmin />
        <main  className={`flex-1 p-6 sm:ml-[260px] transition-all ${
            isModalOpen ? "brightness-50" : ""
          }`}>
          <Navbar title="Overview Gejala" />
          <section className="mt-4">
            <div className="flex flex-row justify-between">
              <ButtonElement
                onClick={handleOpenModal}
                bg="bg-olive"
                label="Tambah Data Gejala"
                icon={FaPlus}
                variant="outline"
                colorScheme="teal"
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
            <TableGejala searchQuery={searchQuery} />
          </section>
          <Footer />
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-md shadow-lg z-10 w-[400px]">
            <h2 className="text-lg font-semibold mb-4">Tambah Data Gejala</h2>
            <input
              type="text"
              placeholder="Masukkan data gejala"
              className="border w-full px-3 py-2 rounded-md mb-4 "
            />
            <div className="flex justify-end gap-2">
              <ButtonElement
                onClick={handleCloseModal}
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
          </div>
          </div>
      )}
    </>
  );
};

export default GejalaLayout;
