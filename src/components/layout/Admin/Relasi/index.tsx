"use client";

import React, { useState } from "react";
import SidebarAdmin from "../../../fragments/SidebarAdmin";
import Navbar from "../../../fragments/Navbar";
import Footer from "../../../fragments/Footer";
import TableRelasi from "../../../fragments/Table/TabelRelasi";
import { FaPlus, FaSearch, FaBackspace, FaSave } from "react-icons/fa";
import ButtonElement from "../../../elements/ButtonElement";
import InputElement from "../../../elements/InputElement";

const RelasiLayout: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <div className="flex min-h-screen">
        <SidebarAdmin />
        <main className="flex-1 p-6 sm:ml-[260px]">
          <Navbar title="Overview Relasi"/>
          <section className="mt-4">
            <div className="flex flex-row justify-between">
              <ButtonElement
                bg="bg-sand"
                label="Tambah Data Relasi"
                icon={FaPlus}
                variant="outline"
                colorScheme="teal"
                link="/admin/tambahrelasi"
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
            <TableRelasi searchQuery={searchQuery} />
          </section>
          <Footer />
        </main>
      </div>
    </>
  );
};

export default RelasiLayout;
