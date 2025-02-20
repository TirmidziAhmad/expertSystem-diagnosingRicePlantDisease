"use client";

import React, { useState, useEffect } from "react";
import SidebarAdmin from "../../../fragments/SidebarAdmin";
import Navbar from "../../../fragments/Navbar";
import Footer from "../../../fragments/Footer";
import TablePenyakit from "../../../fragments/Table/TablePenyakit";
import { FaPlus, FaSearch } from "react-icons/fa";
import ButtonElement from "../../../elements/ButtonElement";
import InputElement from "../../../elements/InputElement";
import { DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Disease {
  id: number;
  name: string;
  image: string;
  description: string;
  symptoms: { symptom: { name: string } }[];
  solutions: { solution: { description: string } }[];
}

const PenyakitLayout: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [newDisease, setNewDisease] = useState({ name: "", image: "", description: "" });

  useEffect(() => {
    fetchDiseases();
  }, []);

  const fetchDiseases = async () => {
    try {
      const response = await fetch("/api/admin/disease");
      if (!response.ok) throw new Error("Failed to fetch diseases");
      const data = await response.json();
      setDiseases(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddDisease = async () => {
    try {
      const response = await fetch("/api/admin/disease", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDisease),
      });
      if (!response.ok) throw new Error("Failed to add disease");
      const data = await response.json();
      setDiseases([...diseases, data]);
      setNewDisease({ name: "", image: "", description: "" });
      document.getElementById("close-add-dialog")?.click();
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <>
      <DialogRoot placement={"center"}>
        <div className="flex min-h-screen">
          <SidebarAdmin />
          <main className="flex-1 p-6 sm:ml-[260px] transition-all">
            <Navbar title="Overview Penyakit" />
            <section className="mt-4">
              <div className="flex flex-row justify-between">
                <DialogTrigger asChild>
                  <ButtonElement bg="bg-sand" label="Tambah Data Penyakit" icon={FaPlus} variant="outline" colorScheme="teal" />
                </DialogTrigger>
                <InputElement icon={FaSearch} placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
              </div>
              <TablePenyakit searchQuery={searchQuery} diseases={diseases} />
            </section>
            <Footer />
          </main>
        </div>
        <DialogContent className="bg-white text-black">
          <DialogCloseTrigger id="close-add-dialog" />
          <DialogHeader>
            <DialogTitle className="font-semibold">Tambah Penyakit</DialogTitle>
          </DialogHeader>
          <DialogBody>
            {error && <p className="text-red-500">{error}</p>}
            <input className="px-2 border" value={newDisease.name} onChange={(e) => setNewDisease({ ...newDisease, name: e.target.value })} placeholder="Masukkan nama penyakit" />
            <input className="px-2 border mt-2" value={newDisease.image} onChange={(e) => setNewDisease({ ...newDisease, image: e.target.value })} placeholder="Masukkan URL gambar" />
            <input className="px-2 border mt-2" value={newDisease.description} onChange={(e) => setNewDisease({ ...newDisease, description: e.target.value })} placeholder="Masukkan deskripsi" />
          </DialogBody>
          <DialogFooter>
            <button onClick={handleAddDisease} className="bg-teal-500 text-white px-2 font-semibold">
              Simpan
            </button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default PenyakitLayout;
