"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import SidebarAdmin from "../../../fragments/SidebarAdmin";
import Navbar from "../../../fragments/Navbar";
import Footer from "../../../fragments/Footer";
import TablePenyakit from "../../../fragments/Table/TablePenyakit";
import { FaPlus, FaSearch } from "react-icons/fa";
import ButtonElement from "../../../elements/ButtonElement";
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

interface Disease {
  id: number;
  name: string;
  image: string;
  description: string;
  symptoms: { symptom: { name: string } }[];
  solutions: { solution: { description: string } }[];
}

interface Symptom {
  id: number;
  description: string;
}

interface Solution {
  id: number;
  description: string;
}

interface NewDisease {
  name: string;
  description: string;
  image: File | null;
  symptoms: { symptomId: number; probability: number }[];
  solutions: { solutionId: number }[];
}

const PenyakitLayout: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [diseases, setDiseases] = useState<Disease[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [symptomOptions, setSymptomOptions] = useState<Symptom[]>([]);
  const [solutionOptions, setSolutionOptions] = useState<Solution[]>([]);
  const [newDisease, setNewDisease] = useState<NewDisease>({
    name: "",
    description: "",
    image: null,
    symptoms: [],
    solutions: [],
  });

  useEffect(() => {
    fetchDiseases();
    fetchSymptoms();
    fetchSolutions();
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

  const fetchSymptoms = async () => {
    const res = await fetch("/api/admin/symptom");
    const data = await res.json();
    setSymptomOptions(data);
  };

  const fetchSolutions = async () => {
    const res = await fetch("/api/admin/solution");
    const data = await res.json();
    setSolutionOptions(data);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewDisease((prev) => ({ ...prev, image: file }));
    }
  };

  const toggleSymptom = (id: number, probability: number) => {
    setNewDisease((prev) => {
      const exists = prev.symptoms.find((s) => s.symptomId === id);
      const newSymptoms = exists
        ? prev.symptoms.filter((s) => s.symptomId !== id)
        : [...prev.symptoms, { symptomId: id, probability }];
      return { ...prev, symptoms: newSymptoms };
    });
  };

  const toggleSolution = (id: number) => {
    setNewDisease((prev) => {
      const exists = prev.solutions.find((s) => s.solutionId === id);
      const newSolutions = exists
        ? prev.solutions.filter((s) => s.solutionId !== id)
        : [...prev.solutions, { solutionId: id }];
      return { ...prev, solutions: newSolutions };
    });
  };

  const handleAddDisease = async () => {
    try {
      const formData = new FormData();
      if (newDisease.image) {
        formData.append("image", newDisease.image);
      }
      formData.append("name", newDisease.name);
      formData.append("description", newDisease.description);
      formData.append("symptoms", JSON.stringify(newDisease.symptoms));
      formData.append("solutions", JSON.stringify(newDisease.solutions));

      const response = await fetch("/api/admin/disease", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to add disease");

      const data = await response.json();
      setDiseases([...diseases, data]);

      setNewDisease({
        name: "",
        description: "",
        image: null,
        symptoms: [],
        solutions: [],
      });

      document.getElementById("close-add-dialog")?.click();
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    }
  };

  return (
    <DialogRoot placement="center">
      <div className="flex min-h-screen">
        <SidebarAdmin />
        <main className="flex-1 p-6 sm:ml-[260px] transition-all">
          <Navbar title="Overview Penyakit" />
          <section className="mt-4">
            <div className="flex flex-row justify-between">
              <DialogTrigger asChild>
                <ButtonElement
                  bg="bg-sand"
                  label="Tambah Data Penyakit"
                  icon={FaPlus}
                  variant="outline"
                  colorScheme="teal"
                />
              </DialogTrigger>
              <InputElement
                icon={FaSearch}
                placeholder="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
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
        <DialogBody className="flex flex-col gap-2 max-h-[70vh] overflow-y-auto">
          {error && <p className="text-red-500">{error}</p>}
          <input
            className="px-2"
            value={newDisease.name}
            onChange={(e) =>
              setNewDisease((prev) => ({ ...prev, name: e.target.value }))
            }
            placeholder="Masukkan nama penyakit"
          />
          <textarea
            className="px-2"
            value={newDisease.description}
            onChange={(e) =>
              setNewDisease((prev) => ({
                ...prev,
                description: e.target.value,
              }))
            }
            placeholder="Masukkan deskripsi"
          />
          <input
            type="file"
            accept="image/*"
            className="px-2"
            onChange={handleFileChange}
          />

          <div className="mt-2">
            <label className="font-semibold">Pilih Gejala</label>
            <div className="max-h-40 overflow-y-auto border p-2 rounded">
              {symptomOptions.map((symptom) => (
                <div key={symptom.id} className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={newDisease.symptoms.some(
                      (s) => s.symptomId === symptom.id
                    )}
                    onChange={() => toggleSymptom(symptom.id, 0.8)}
                  />
                  <span>{symptom.description}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-2">
            <label className="font-semibold">Pilih Pengendalian</label>
            <div className="max-h-40 overflow-y-auto border p-2 rounded">
              {solutionOptions.map((solution) => (
                <div key={solution.id} className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    checked={newDisease.solutions.some(
                      (s) => s.solutionId === solution.id
                    )}
                    onChange={() => toggleSolution(solution.id)}
                  />
                  <span>{solution.description}</span>
                </div>
              ))}
            </div>
          </div>
        </DialogBody>
        <DialogFooter>
          <button
            onClick={handleAddDisease}
            className="bg-teal-500 text-white px-4 py-2 rounded font-semibold"
          >
            Simpan
          </button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
};

export default PenyakitLayout;
