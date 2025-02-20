"use client";

import { Table } from "@chakra-ui/react";
import { FaPenSquare, FaTrash } from "react-icons/fa";
import ButtonElement from "../../elements/ButtonElement";
import { useMemo } from "react";
import Image from "next/image";

interface TablePenyakitProps {
  searchQuery: string;
  diseases: Disease[];
}

const TablePenyakit: React.FC<TablePenyakitProps> = ({ searchQuery, diseases }) => {
  const tableHeader = useMemo(() => ["No", "Gambar", "Nama Penyakit", "Deskripsi", "Gejala", "Pengendalian", "Action"], []);

  const filteredItems = diseases.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase()));

  const rows = filteredItems.map((item, index) => (
    <Table.Row key={item.id} className="border-b border-gray-300 hover:bg-gray-100 transition-all">
      <Table.Cell>{index + 1}</Table.Cell>
      <Table.Cell>
        <Image src={item.image} alt={item.name} width={100} height={100} />
      </Table.Cell>
      <Table.Cell>{item.name}</Table.Cell>
      <Table.Cell>{item.description}</Table.Cell>
      <Table.Cell>{item.symptoms.map((symptom: any) => symptom.symptom.name).join(", ")}</Table.Cell>
      <Table.Cell>{item.solutions.map((solution: any) => solution.solution.description).join(", ")}</Table.Cell>
      <Table.Cell>
        <div className="flex flex-row gap-2">
          <ButtonElement bg="bg-brick" label="Edit" icon={FaPenSquare} variant="outline" colorScheme="teal" />
          <ButtonElement bg="bg-gold" label="Hapus" icon={FaTrash} variant="outline" colorScheme="teal" />
        </div>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <Table.Root className="mt-4 border border-gray-300" striped>
      <Table.Header className="bg-beige text-white">
        <Table.Row>
          {tableHeader.map((header, index) => (
            <Table.ColumnHeader key={index}>{header}</Table.ColumnHeader>
          ))}
        </Table.Row>
      </Table.Header>
      <Table.Body>{rows}</Table.Body>
    </Table.Root>
  );
};

export default TablePenyakit;
