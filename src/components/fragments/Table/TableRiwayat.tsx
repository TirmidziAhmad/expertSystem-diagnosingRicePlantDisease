"use client";

import { Table, Button } from "@chakra-ui/react";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import parseFloatToPercentage from "@/lib/parseFloatToPercentage";
import parseDate from "@/lib/parseDate";
import Image from "next/image";
import { DialogBody, DialogCloseTrigger, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogRoot } from "@/components/ui/dialog";

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

const TableRiwayat = () => {
  const tableHeader = useMemo(() => ["No", "Penyakit", "Tanggal", "Nilai Presentase", "Action"], []);
  const userId = Cookies.get("userId");
  const [data, setData] = useState<DataProps[]>([]);
  const [selectedItem, setSelectedItem] = useState<DataProps | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/user/history/${userId}`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (userId) fetchData();
  }, [userId]);

  return (
    <>
      <DialogRoot placement={"center"}>
        <Table.Root striped interactive size="lg" className="mt-4 border">
          <Table.Header className="items-center text-center">
            <Table.Row>
              {tableHeader.map((item, index) => (
                <Table.ColumnHeader key={index} className="bg-[#A38A41] text-white">
                  {item}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((item, index) => (
              <Table.Row key={item.id} className="bg-white">
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{item.disease.name}</Table.Cell>
                <Table.Cell>{parseDate(item.createdAt)}</Table.Cell>
                <Table.Cell>{parseFloatToPercentage(item.disease.value)}</Table.Cell>
                <Table.Cell>
                  <DialogTrigger asChild>
                    <Button className="bg-[#352802] text-white px-3 font-semibold" onClick={() => setSelectedItem(item)}>
                      Detail
                    </Button>
                  </DialogTrigger>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        {/* Menampilkan Detail Dialog */}
        {selectedItem && (
          <DialogContent className="bg-[#FFFDF9] text-[#352802]">
            <DialogHeader>
              <DialogTitle className="font-bold">Detail Riwayat Konsultasi</DialogTitle>
            </DialogHeader>
            <DialogBody>
              <div className="flex justify-center items-center">
                <Image src={selectedItem.disease.image} alt={selectedItem.disease.name} className="rounded-lg mb-4" width={300} height={300} />
              </div>
              <p>
                <strong>Penyakit:</strong> {selectedItem.disease.name}
              </p>
              <p>
                <strong>Nilai Presentase:</strong> {parseFloatToPercentage(selectedItem.disease.value)}
              </p>
              <p>
                <strong>Kemungkinan Penyakit Lain:</strong> {selectedItem.otherDiseases.length > 0 ? selectedItem.otherDiseases.map((d) => `${d.name} (${parseFloatToPercentage(d.value)})`).join(", ") : "Tidak ada"}
              </p>
              <p>
                <strong>Waktu Konsultasi:</strong> {parseDate(selectedItem.createdAt)}
              </p>
              <p>
                <strong>Solusi:</strong>
              </p>
              <ul className="list-disc pl-5">{selectedItem.solutions.length > 0 ? selectedItem.solutions.map((solution, i) => <li key={i}>{solution}</li>) : <li>Tidak ada solusi yang tersedia.</li>}</ul>
              <p>
                <strong>Kode Gejala yang di-Input:</strong>
              </p>
              <ul className="list-disc pl-5">{selectedItem.userInput.length > 0 ? selectedItem.userInput.map((input, i) => <li key={i}>{input}</li>) : <li>Tidak ada data input pengguna.</li>}</ul>
            </DialogBody>
            <DialogCloseTrigger />
          </DialogContent>
        )}
      </DialogRoot>
    </>
  );
};

export default TableRiwayat;
