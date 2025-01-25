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

const TableGejala: React.FC<TableGejalaProps> = ({ searchQuery }) => {
  const [selection, setSelection] = useState<string[]>([]);

  const filteredItems = items.filter(
    (item) =>
      item.kodegejala.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.namagejala.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const rows = filteredItems.map((item) => (
    <Table.Row
      key={item.kodegejala}
      data-selected={selection.includes(item.kodegejala) ? "" : undefined}
      className="border-b border-gray-300 hover:bg-gray-100 transition-all"
    >
      <Table.Cell className="py-2 px-4">
        <Checkbox
          aria-label="Select row"
          checked={selection.includes(item.kodegejala)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, item.kodegejala]
                : selection.filter((kodegejala) => kodegejala !== item.kodegejala)
            );
          }}
        />
      </Table.Cell>
      <Table.Cell className="py-2 px-4">{item.kodegejala}</Table.Cell>
      <Table.Cell className="py-2 px-4">{item.namagejala}</Table.Cell>
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
            <Table.ColumnHeader className="py-2 px-14 text-center">
              Kode Gejala
            </Table.ColumnHeader>
            <Table.ColumnHeader className="py-2 px-60 text-center">
              Nama Gejala
            </Table.ColumnHeader>
            <Table.ColumnHeader className="py-2 px-30 text-center">
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
  { id: 1, kodegejala: "G001", namagejala: "Hawar Daun" },
  { id: 2, kodegejala: "G002", namagejala: "Wereng" },
  { id: 3, kodegejala: "G003", namagejala: "Furniture" },
  { id: 4, kodegejala: "G004", namagejala: "Electronics" },
  { id: 5, kodegejala: "G005", namagejala: "Accessories" },
];

export default TableGejala;
