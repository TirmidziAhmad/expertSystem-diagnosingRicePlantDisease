"use client";

import { useState } from "react";
import CardMenu from "../../../fragments/CardMenu";
import Navbar from "../../../fragments/Navbar";
import Hero from "../../../fragments/Hero";
import Footer from "../../../fragments/Footer";
import TableDiagnosa from "../../../fragments/Table/TableDiagnosa";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "@chakra-ui/react";
import Image from "next/image";
import { DialogBody, DialogCloseTrigger, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogRoot } from "@/components/ui/dialog";
import parseFloatToPercentage from "@/lib/parseFloatToPercentage";
import parseDate from "@/lib/parseDate";

interface Disease {
  value: number;
  image: string;
  name: string;
}

interface DataProps {
  id: number;
  createdAt: string;
  disease: Disease;
  otherDiseases: Disease[];
  solutions: string[];
  userInput: string[];
}

const DiagnosaLayout: React.FC = () => {
  const userId = Number(Cookies.get("userId"));

  const [selectedSymptomCodes, setSelectedSymptomCodes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DataProps | null>(null);

  const handleSelectedSymptomCodes = (codes: string[]) => {
    setSelectedSymptomCodes(codes);
  };

  const handleButtonDiagnose = async () => {
    if (selectedSymptomCodes.length === 0) {
      setError("Please select at least one symptom");
      return;
    }

    if (isNaN(userId)) {
      setError("Invalid user ID");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post("/api/user/diagnose", {
        userId,
        symptoms: selectedSymptomCodes,
      });

      setData(response.data.data);
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred during diagnosis");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DialogRoot size={"lg"} placement={"center"}>
      <div className="flex min-h-screen">
        <CardMenu />
        <main className="flex-1 p-6 sm:ml-[260px]">
          <Navbar title="Diagnosa" />
          <section className="mt-4">
            <Hero title="" subtitle="Silahkan memilih gejala yang sesuai dengan kondisi tanaman padi anda..." imageSrc="/total-pengetahuan.svg" />
          </section>

          <TableDiagnosa selectedSymptomCodes={handleSelectedSymptomCodes} />

          {error && <div className="mt-2 text-red-600">{error}</div>}

          <div className="flex justify-end mt-3">
            <DialogTrigger>
              <Button variant="outline" className="bg-[#352802] text-white px-3 font-semibold hover:bg-[#4A3C18]" onClick={handleButtonDiagnose} disabled={isLoading}>
                {isLoading ? "Memproses..." : `Mulai Diagnosa`}
                <FaSearch />
              </Button>
            </DialogTrigger>
          </div>

          {data && (
            <DialogContent className="bg-[#FFFDF9] text-[#352802]">
              <DialogHeader>
                <DialogTitle className="font-bold">Detail Riwayat Konsultasi</DialogTitle>
              </DialogHeader>
              <DialogBody>
                <div className="flex justify-center items-center">
                  <Image src={data.disease.image} alt={data.disease.name} className="rounded-lg mb-4" width={300} height={300} />
                </div>
                <p>
                  <strong>Penyakit:</strong> {data.disease.name}
                </p>
                <p>
                  <strong>Nilai Presentase:</strong> {parseFloatToPercentage(data.disease.value)}
                </p>
                <p>
                  <strong>Kemungkinan Penyakit Lain:</strong> {data.otherDiseases.length > 0 ? data.otherDiseases.map((d) => `${d.name} (${parseFloatToPercentage(d.value)})`).join(", ") : "Tidak ada"}
                </p>
                <p>
                  <strong>Waktu Konsultasi:</strong> {parseDate(data.createdAt)}
                </p>
                <p>
                  <strong>Solusi:</strong>
                </p>
                <ul className="list-disc pl-5">{data.solutions.length > 0 ? data.solutions.map((solution, i) => <li key={i}>{solution}</li>) : <li>Tidak ada solusi yang tersedia.</li>}</ul>
                <p>
                  <strong>Kode Gejala yang di-Input:</strong>
                </p>
                <ul className="list-disc pl-5">{data.userInput.length > 0 ? data.userInput.map((input, i) => <li key={i}>{input}</li>) : <li>Tidak ada data input pengguna.</li>}</ul>
              </DialogBody>
              <DialogCloseTrigger />
            </DialogContent>
          )}

          <Footer />
        </main>
      </div>
    </DialogRoot>
  );
};

export default DiagnosaLayout;
