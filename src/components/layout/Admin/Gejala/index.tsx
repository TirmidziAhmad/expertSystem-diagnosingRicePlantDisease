// GejalaLayout.tsx
"use client";

import React, { useState, useCallback } from "react";
import SidebarAdmin from "../../../fragments/SidebarAdmin";
import Navbar from "../../../fragments/Navbar";
import Footer from "../../../fragments/Footer";
import TableGejala from "../../../fragments/Table/TabelGejala";
import { FaPlus, FaSearch } from "react-icons/fa";
import InputElement from "../../../elements/InputElement";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button, Input } from "@chakra-ui/react";
import axios from "axios";

const GejalaLayout: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [description, setDescription] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState<string>("");
  const [refreshTable, setRefreshTable] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
    },
    []
  );

  const handleSubmit = async () => {
    if (!description || !code) {
      setError("Deskripsi dan kode harus diisi.");
      return;
    }

    try {
      if (isEditMode && editId !== null) {
        await axios.put("/api/admin/symptom", {
          id: editId,
          description,
          code,
        });
      } else {
        await axios.post("/api/admin/symptom", {
          description,
          code,
        });
      }

      setDescription("");
      setCode("");
      setEditId(null);
      setIsEditMode(false);
      setError("");
      setRefreshTable((prev) => !prev);
      setIsFormDialogOpen(false);
    } catch (err) {
      console.error("Error saving gejala:", err);
      setError("Gagal menyimpan gejala.");
    }
  };

  return (
    <DialogRoot placement={"center"} open={isFormDialogOpen}>
      <div className="flex min-h-screen">
        <SidebarAdmin />
        <main className="flex-1 p-6 sm:ml-[260px]">
          <Navbar title="Overview Gejala" />
          <section className="mt-4">
            <div className="flex flex-row justify-between">
              <DialogTrigger asChild>
                <Button
                  id="open-add-dialog"
                  className="bg-sand rounded-md w-[150px] font-semibold text-white"
                  onClick={() => {
                    setDescription("");
                    setCode("");
                    setEditId(null);
                    setIsEditMode(false);
                    setError("");
                    setIsFormDialogOpen(true); // Open the dialog
                  }}
                >
                  <FaPlus /> Tambah Gejala
                </Button>
              </DialogTrigger>
              <InputElement
                icon={FaSearch}
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
            <TableGejala
              searchQuery={searchQuery}
              refreshTable={refreshTable}
              setRefreshTable={setRefreshTable}
              onEdit={(item) => {
                setDescription(item.description);
                setCode(item.code);
                setEditId(item.id);
                setIsEditMode(true);
                setIsFormDialogOpen(true); // Open the dialog and populate fields
              }}
            />
          </section>
          <Footer />
        </main>
      </div>

      <DialogContent className="bg-white text-black">
        <DialogCloseTrigger id="close-add-dialog" />
        <DialogHeader>
          <DialogTitle className="font-semibold">
            {isEditMode ? "Edit Gejala" : "Tambah Gejala"}
          </DialogTitle>
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4">
          {error && <p className="text-red-500">{error}</p>}
          <p>Kode Gejala</p>
          <Input
            placeholder="Masukkan Kode gejala"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="border px-2"
          />
          <p>Deskriptsi Gejala</p>
          <Input
            placeholder="Masukkan Deskripsi gejala"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border px-2"
          />
        </DialogBody>
        <DialogFooter>
          <Button
            onClick={handleSubmit}
            className="bg-teal-500 text-white px-4 py-2 rounded font-semibold"
          >
            Simpan
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default GejalaLayout;
