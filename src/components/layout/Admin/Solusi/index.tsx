"use client";

import { useState, useCallback } from "react";
import SidebarAdmin from "../../../fragments/SidebarAdmin";
import Navbar from "../../../fragments/Navbar";
import Footer from "../../../fragments/Footer";
import TableRelasi from "../../../fragments/Table/TabelRelasi";
import { FaPlus, FaSearch } from "react-icons/fa";
import InputElement from "../../../elements/InputElement";
import { Button, Input } from "@chakra-ui/react";
import axios from "axios";
import { DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const SolusiLayout: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [description, setDescription] = useState("");
  const [refreshTable, setRefreshTable] = useState(false);

  const handleAddSolution = async () => {
    if (!description.trim()) return alert("Deskripsi tidak boleh kosong!");

    try {
      await axios.post("/api/admin/solution", { description });
      setDescription("");
      setRefreshTable(!refreshTable);
      document.getElementById("close-add-dialog")?.click();
    } catch (error) {
      console.error("Error adding solution:", error);
    }
  };

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleDescriptionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
  }, []);

  return (
    <DialogRoot placement={"center"}>
      <div className="flex min-h-screen">
        <SidebarAdmin />
        <main className="flex-1 p-6 sm:ml-[260px]">
          <Navbar title="Solusi" />
          <section className="mt-4">
            <div className="flex flex-row justify-between">
              <DialogTrigger asChild>
                <Button className="bg-sand rounded-md w-[150px] font-semibold text-white">
                  <FaPlus /> Tambah Solusi
                </Button>
              </DialogTrigger>

              <div className="flex items-center">
                <InputElement icon={FaSearch} placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
              </div>
            </div>
            <TableRelasi searchQuery={searchQuery} refreshTable={refreshTable} setRefreshTable={setRefreshTable} />
          </section>
          <Footer />
        </main>
      </div>
      <DialogContent className="bg-white text-black">
        <DialogCloseTrigger id="close-add-dialog" />
        <DialogHeader>
          <DialogTitle className="font-semibold">Tambah Solusi</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Input className="px-2 border" value={description} onChange={handleDescriptionChange} placeholder="Masukkan nama solusi" />
        </DialogBody>
        <DialogFooter>
          <Button onClick={handleAddSolution} className="bg-teal-500 text-white px-2 font-semibold">
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default SolusiLayout;
