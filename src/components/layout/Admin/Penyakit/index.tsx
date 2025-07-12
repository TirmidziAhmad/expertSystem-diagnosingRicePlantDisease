"use client";

import React, { useState, useEffect, ChangeEvent } from "react";
import SidebarAdmin from "../../../fragments/SidebarAdmin";
import Navbar from "../../../fragments/Navbar";
import Footer from "../../../fragments/Footer";
import TablePenyakit from "../../../fragments/Table/TablePenyakit";
import { FaPlus, FaSearch } from "react-icons/fa";
import ButtonElement from "../../../elements/ButtonElement";
import InputElement from "../../../elements/InputElement";
import { Input, Textarea } from "@chakra-ui/react";
import Image from "next/image";
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

interface Symptom {
  id: number;
  description: string;
}

interface Solution {
  id: number;
  description: string;
}

interface Disease {
  id: number;
  name: string;
  image: string;
  description: string;
  symptoms: { symptom: Symptom; probability: number }[];
  solutions: { solution: Solution }[];
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
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [diseaseToDelete, setDiseaseToDelete] = useState<number | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [currentDiseaseId, setCurrentDiseaseId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchDiseases();
    fetchSymptoms();
    fetchSolutions();
  }, []);

  const fetchDiseases = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/admin/disease");
      if (!response.ok) throw new Error("Failed to fetch diseases");
      const data = await response.json();
      setDiseases(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSymptoms = async () => {
    try {
      const res = await fetch("/api/admin/symptom");
      const data = await res.json();
      setSymptomOptions(data);
    } catch {
      setError("Failed to fetch symptoms");
    }
  };

  const fetchSolutions = async () => {
    try {
      const res = await fetch("/api/admin/solution");
      const data = await res.json();
      setSolutionOptions(data);
    } catch {
      setError("Failed to fetch solutions");
    }
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

  const handleProbabilityChange = (symptomId: number, value: string) => {
    const probability = parseFloat(value);
    if (
      value !== "" &&
      (isNaN(probability) || probability < 0 || probability > 1)
    ) {
      return;
    }

    setNewDisease((prev) => ({
      ...prev,
      symptoms: prev.symptoms.map((s) =>
        s.symptomId === symptomId
          ? { ...s, probability: isNaN(probability) ? 0 : probability }
          : s
      ),
    }));
  };

  const toggleSymptom = (id: number) => {
    setNewDisease((prev) => {
      const exists = prev.symptoms.some((s) => s.symptomId === id);
      const newSymptoms = exists
        ? prev.symptoms.filter((s) => s.symptomId !== id)
        : [...prev.symptoms, { symptomId: id, probability: 0 }];
      return { ...prev, symptoms: newSymptoms };
    });
  };

  const toggleSolution = (id: number) => {
    setNewDisease((prev) => {
      const exists = prev.solutions.some((s) => s.solutionId === id);
      const newSolutions = exists
        ? prev.solutions.filter((s) => s.solutionId !== id)
        : [...prev.solutions, { solutionId: id }];
      return { ...prev, solutions: newSolutions };
    });
  };

  const resetForm = () => {
    setNewDisease({
      name: "",
      description: "",
      image: null,
      symptoms: [],
      solutions: [],
    });
    setEditMode(false);
    setCurrentDiseaseId(null);
    setError(null);
  };

  const validateForm = () => {
    if (!newDisease.name.trim()) {
      setError("Nama penyakit tidak boleh kosong");
      return false;
    }
    if (!newDisease.description.trim()) {
      setError("Deskripsi tidak boleh kosong");
      return false;
    }
    if (newDisease.symptoms.length === 0) {
      setError("Pilih setidaknya satu gejala");
      return false;
    }
    if (newDisease.solutions.length === 0) {
      setError("Pilih setidaknya satu solusi");
      return false;
    }
    for (const symptom of newDisease.symptoms) {
      if (
        symptom.probability < 0 ||
        symptom.probability > 1 ||
        isNaN(symptom.probability)
      ) {
        setError("Probabilitas gejala harus antara 0 dan 1");
        return false;
      }
    }
    return true;
  };

  const handleAddDisease = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("name", newDisease.name);
      formData.append("description", newDisease.description);
      formData.append("symptoms", JSON.stringify(newDisease.symptoms));
      formData.append("solutions", JSON.stringify(newDisease.solutions));

      if (newDisease.image) {
        formData.append("image", newDisease.image);
      }

      const url =
        editMode && currentDiseaseId
          ? `/api/admin/disease`
          : "/api/admin/disease";

      const method = editMode ? "PUT" : "POST";

      if (editMode && currentDiseaseId) {
        formData.append("id", currentDiseaseId.toString());
      }

      const response = await fetch(url, {
        method,
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message ||
            (editMode ? "Failed to update disease" : "Failed to add disease")
        );
      }

      await fetchDiseases();
      resetForm();
      document.getElementById("close-add-dialog")?.click();
    } catch (error) {
      setError(error instanceof Error ? error.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditDisease = (id: number) => {
    const diseaseToEdit = diseases.find((d) => d.id === id);
    if (diseaseToEdit) {
      setEditMode(true);
      setCurrentDiseaseId(id);

      const mappedSymptoms = diseaseToEdit.symptoms.map((s) => ({
        symptomId: s.symptom.id,
        probability: s.probability,
      }));

      const mappedSolutions = diseaseToEdit.solutions.map((s) => ({
        solutionId: s.solution.id,
      }));

      setNewDisease({
        name: diseaseToEdit.name,
        description: diseaseToEdit.description,
        image: null,
        symptoms: mappedSymptoms,
        solutions: mappedSolutions,
      });
      document.getElementById("add-disease-dialog-trigger")?.click();
    }
  };

  const openDeleteDialog = (id: number) => {
    setDiseaseToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDeleteDisease = async () => {
    if (!diseaseToDelete) return;

    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/disease/${diseaseToDelete}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete disease");
      }

      setDiseases((prev) => prev.filter((d) => d.id !== diseaseToDelete));
      setDeleteDialogOpen(false);
      setDiseaseToDelete(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogRoot placement="center">
      <div className="flex min-h-screen">
        <SidebarAdmin />
        <main className="flex-1 p-6 sm:ml-[260px] transition-all">
          <Navbar title="Overview Penyakit" />
          <section className="mt-4">
            {error && (
              <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
                {error}
              </div>
            )}
            <div className="flex flex-row justify-between">
              <DialogTrigger asChild onClick={() => resetForm()}>
                <ButtonElement
                  id="add-disease-dialog-trigger"
                  bg="bg-sand"
                  label={editMode ? "Edit Penyakit" : "Tambah Data Penyakit"}
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

            {isLoading ? (
              <div className="mt-8 text-center">Memuat data...</div>
            ) : (
              <TablePenyakit
                searchQuery={searchQuery}
                diseases={diseases}
                onEdit={handleEditDisease}
                onDelete={openDeleteDialog}
              />
            )}
          </section>
          <Footer />
        </main>
      </div>

      {/* Add/Edit Dialog */}
      <DialogContent className="bg-white text-black max-w-2xl">
        <DialogCloseTrigger id="close-add-dialog" onClick={resetForm} />
        <DialogHeader>
          <DialogTitle className="font-semibold">
            {editMode ? "Edit Penyakit" : "Tambah Penyakit"}
          </DialogTitle>
        </DialogHeader>
        <DialogBody className="flex flex-col gap-4 max-h-[70vh] overflow-y-auto p-4">
          {error && (
            <div className="text-red-500 p-2 bg-red-50 rounded">{error}</div>
          )}

          <div className="space-y-2">
            <label className="block font-medium">Nama Penyakit</label>
            <Input
              value={newDisease.name}
              onChange={(e) =>
                setNewDisease((prev) => ({ ...prev, name: e.target.value }))
              }
              placeholder="Masukkan nama penyakit"
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Deskripsi</label>
            <Textarea
              value={newDisease.description}
              onChange={(e) =>
                setNewDisease((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              placeholder="Masukkan deskripsi penyakit"
              rows={4}
            />
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Gambar Penyakit</label>
            {editMode && !newDisease.image && (
              <div className="mb-2">
                <p className="text-sm text-gray-600">Gambar Saat Ini:</p>
                <Image
                  src={
                    diseases.find((d) => d.id === currentDiseaseId)?.image || ""
                  }
                  alt="Current disease"
                  width={100}
                  height={100}
                  className="object-cover rounded"
                />
              </div>
            )}
            <Input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              paddingY={1.5}
            />
            {editMode && (
              <p className="text-sm text-gray-500">
                {newDisease.image
                  ? "Gambar baru dipilih"
                  : "Biarkan kosong jika tidak ingin mengubah gambar"}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Gejala</label>
            <div className="max-h-48 overflow-y-auto border p-3 rounded bg-gray-50">
              {symptomOptions.map((symptom) => {
                const isChecked = newDisease.symptoms.some(
                  (s) => s.symptomId === symptom.id
                );
                const currentProbability =
                  newDisease.symptoms.find((s) => s.symptomId === symptom.id)
                    ?.probability || 0;
                return (
                  <div
                    key={symptom.id}
                    className="flex gap-3 items-center mb-3 p-2 hover:bg-gray-100 rounded"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleSymptom(symptom.id)}
                      className="form-checkbox h-4 w-4 text-teal-600"
                    />
                    <span className="flex-1">{symptom.description}</span>
                    {isChecked && (
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-600">
                          Probabilitas:
                        </span>
                        <Input
                          type="number"
                          step="0.01"
                          min={0}
                          max={1}
                          value={currentProbability}
                          onChange={(e) =>
                            handleProbabilityChange(symptom.id, e.target.value)
                          }
                          placeholder="0-1"
                          width="80px"
                          size="sm"
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block font-medium">Solusi Pengendalian</label>
            <div className="max-h-48 overflow-y-auto border p-3 rounded bg-gray-50">
              {solutionOptions.map((solution) => (
                <div
                  key={solution.id}
                  className="flex gap-3 items-center p-2 hover:bg-gray-100 rounded"
                >
                  <input
                    type="checkbox"
                    checked={newDisease.solutions.some(
                      (s) => s.solutionId === solution.id
                    )}
                    onChange={() => toggleSolution(solution.id)}
                    className="form-checkbox h-4 w-4 text-teal-600"
                  />
                  <span>{solution.description}</span>
                </div>
              ))}
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="p-4 border-t">
          <button
            onClick={handleAddDisease}
            disabled={isLoading}
            className={`px-4 py-2 rounded font-semibold text-white ${
              isLoading ? "bg-gray-400" : "bg-teal-500 hover:bg-teal-600"
            } transition-colors`}
          >
            {isLoading
              ? "Memproses..."
              : editMode
              ? "Update Penyakit"
              : "Simpan Penyakit"}
          </button>
        </DialogFooter>
      </DialogContent>

      {/* Delete Confirmation Dialog */}
      <DialogRoot open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="bg-white text-black max-w-md">
          <DialogHeader>
            <DialogTitle className="font-semibold">
              Konfirmasi Penghapusan
            </DialogTitle>
          </DialogHeader>
          <DialogBody className="p-4">
            <p>
              Apakah Anda yakin ingin menghapus penyakit ini? Tindakan ini tidak
              dapat dibatalkan.
            </p>
          </DialogBody>
          <DialogFooter className="gap-2 p-4 border-t">
            <button
              onClick={() => setDeleteDialogOpen(false)}
              disabled={isLoading}
              className="px-4 py-2 bg-gray-500 text-white rounded font-semibold hover:bg-gray-600 transition-colors"
            >
              Batal
            </button>
            <button
              onClick={handleDeleteDisease}
              disabled={isLoading}
              className={`px-4 py-2 rounded font-semibold text-white ${
                isLoading ? "bg-red-300" : "bg-red-500 hover:bg-red-600"
              } transition-colors`}
            >
              {isLoading ? "Menghapus..." : "Ya, Hapus"}
            </button>
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </DialogRoot>
  );
};

export default PenyakitLayout;
