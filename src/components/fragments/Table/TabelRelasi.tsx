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

const TableRelasi: React.FC<TableGejalaProps> = ({ searchQuery }) => {
  const [selection, setSelection] = useState<string[]>([]);

  const filteredItems = items.filter(
    (item) =>
      item.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.namapenyakit.toLowerCase().includes(searchQuery.toLowerCase())
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
                : selection.filter((name) => name !== item.id)
            );
          }}
        />
      </Table.Cell>
      <Table.Cell className="py-2 px-4">{item.id}</Table.Cell>
      <Table.Cell className="py-2 px-4">{item.namapenyakit}</Table.Cell>
      <Table.Cell className="py-2 px-4">{item.namagejala}</Table.Cell>
      <Table.Cell className="py-2 px-4">{item.bobot}</Table.Cell>
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
            <Table.ColumnHeader className="py-2 px-4 text-center">
              ID
            </Table.ColumnHeader>
            <Table.ColumnHeader className="py-2 px-24 text-center">
              Nama Penyakit
            </Table.ColumnHeader>
            <Table.ColumnHeader className="py-2 px-24 text-center">
              Nama Gejala
            </Table.ColumnHeader>
            <Table.ColumnHeader className="py-2 px-10 text-center">
              Bobot
            </Table.ColumnHeader>
            <Table.ColumnHeader className="py-2 px-20 text-center">
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
  { id: "R001", namapenyakit: "Hawar Daun", namagejala: "kekuningan", bobot: "0.85" },
  { id: "R002", namapenyakit: "Bosok", namagejala: "bosok", bobot: "0.85" },
  { id: "R003", namapenyakit: "Hawar Daun", namagejala: "kekuningan", bobot: "0.85" },
  { id: "R004", namapenyakit: "Hawar Daun", namagejala: "kekuningan", bobot: "0.85" },
];

export default TableRelasi;
