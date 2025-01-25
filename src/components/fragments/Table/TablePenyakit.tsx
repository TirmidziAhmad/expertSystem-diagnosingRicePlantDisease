"use client";

import { Table } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { FaPenSquare } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import ButtonElement from "../../elements/ButtonElement";

interface TableGejalaProps {
  searchQuery: string;
}

const TablePenyakit: React.FC<TableGejalaProps> = ({ searchQuery }) => {
  const [selection, setSelection] = useState<string[]>([]);

  const filteredItems = items.filter(
    (item) =>
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const rows = filteredItems.map((item) => (
    <Table.Row
      key={item.id}
      data-selected={selection.includes(item.id) ? "" : undefined}
      className="border-b border-gray-300 hover:bg-gray-100 transition-all"
    >
      <Table.Cell className="py-2 px-4">
        <Checkbox
          aria-label="Select row"
          checked={selection.includes(item.id)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, item.id]
                : selection.filter((id) => id !== item.id)
            );
          }}
        />
      </Table.Cell>
      
      <Table.Cell className="py-2 px-4">{item.id}</Table.Cell>
      <Table.Cell className="py-2 px-4">{item.name}</Table.Cell>
      <Table.Cell className="py-2 px-4">{item.desc}</Table.Cell>
      <Table.Cell className="py-2 px-4">{item.control}</Table.Cell>
      <Table.Cell className="py-2 px-4">{item.image}</Table.Cell>
      <Table.Cell className="py-2 px-4">
        <div className="flex flex-row gap-2">
          <ButtonElement
            bg="bg-brick"
            label="Edit"
            icon={FaPenSquare}
            variant="outline"
            colorScheme="teal"
          />
          <ButtonElement
            bg="bg-gold"
            label="Hapus"
            icon={FaTrash}
            variant="outline"
            colorScheme="teal"
          />
        </div>
      </Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      <Table.Root className="mt-4 border border-gray-300 item-center text-center">
        <Table.Header className="bg-beige text-white">
          <Table.Row>
            <Table.ColumnHeader />
            <Table.ColumnHeader className="py-2  text-center">
              ID
            </Table.ColumnHeader>
            <Table.ColumnHeader className="py-2 px-10 text-center">
              Nama Penyakit
            </Table.ColumnHeader>
            <Table.ColumnHeader className="py-2 px-12 text-center">
              Deskripsi
            </Table.ColumnHeader>
            <Table.ColumnHeader className="py-2 px-12 text-center">
              Pengendalian
            </Table.ColumnHeader>
            <Table.ColumnHeader className="py-2 px-4 text-center">
              Gambar
            </Table.ColumnHeader>
            <Table.ColumnHeader className="py-2 px-10 text-center">
              Action
            </Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table.Root>
    </>
  );
};

const items = [
  { id: "G001", name: "Hawar Daun", desc: "lorem", control: "lorem", image: "/public/icon-gejala.svg"},
  { id: "G002", name: "Wereng", desc: "lorem",  control: "lorem", image: "/public/icon-gejala.svg"},
  { id: "G003", name: "Furniture", desc: "lorem",  control: "lorem", image: "/public/icon-gejala.svg"},
  { id: "G004", name: "Electronics", desc: "lorem",  control: "lorem", image: "/public/icon-gejala.svg"},
  { id: "G005", name: "Accessories", desc: "lorem",  control: "lorem", image: "/public/icon-gejala.svg"},
];

export default TablePenyakit;
