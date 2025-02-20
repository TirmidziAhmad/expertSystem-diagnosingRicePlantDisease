"use client";

import { Table } from "@chakra-ui/react";
import { useState } from "react";
import { FaPenSquare } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import ButtonElement from "../../elements/ButtonElement";

interface TableGejalaProps {
  searchQuery: string;
}

const TablePenyakit: React.FC<TableGejalaProps> = ({ searchQuery }) => {
  const filteredItems = items.filter((item) => item.id.toLowerCase().includes(searchQuery.toLowerCase()) || item.name.toLowerCase().includes(searchQuery.toLowerCase()));

  const rows = filteredItems.map((item) => (
    <Table.Row key={item.id} className="border-b border-gray-300 hover:bg-gray-100 transition-all">
      <Table.Cell className="">{item.id}</Table.Cell>
      <Table.Cell className="">{item.name}</Table.Cell>
      <Table.Cell className="">{item.desc}</Table.Cell>
      <Table.Cell className="">{item.control}</Table.Cell>
      <Table.Cell className="">{item.image}</Table.Cell>
      <Table.Cell className="">
        <div className="flex flex-row gap-2">
          <ButtonElement bg="bg-brick" label="Edit" icon={FaPenSquare} variant="outline" colorScheme="teal" />
          <ButtonElement bg="bg-gold" label="Hapus" icon={FaTrash} variant="outline" colorScheme="teal" />
        </div>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      <Table.Root className="mt-4 border border-gray-300 ">
        <Table.Header className="bg-beige text-white">
          <Table.Row>
            <Table.ColumnHeader className="">No</Table.ColumnHeader>
            <Table.ColumnHeader className=" ">Gambar</Table.ColumnHeader>
            <Table.ColumnHeader className=" ">Nama Penyakit</Table.ColumnHeader>
            <Table.ColumnHeader className=" ">Deskripsi</Table.ColumnHeader>
            <Table.ColumnHeader className=" ">Gejala</Table.ColumnHeader>
            <Table.ColumnHeader className=" ">Pengendalian</Table.ColumnHeader>
            <Table.ColumnHeader className="">Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table.Root>
    </>
  );
};

const items = [
  { id: "G001", name: "Hawar Daun", desc: "lorem", control: "lorem", image: "/public/icon-gejala.svg" },
  { id: "G002", name: "Wereng", desc: "lorem", control: "lorem", image: "/public/icon-gejala.svg" },
  { id: "G003", name: "Furniture", desc: "lorem", control: "lorem", image: "/public/icon-gejala.svg" },
  { id: "G004", name: "Electronics", desc: "lorem", control: "lorem", image: "/public/icon-gejala.svg" },
  { id: "G005", name: "Accessories", desc: "lorem", control: "lorem", image: "/public/icon-gejala.svg" },
];

export default TablePenyakit;
