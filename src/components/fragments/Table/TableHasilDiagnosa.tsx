"use client";

import { Table } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const TableHasilDiagnosa = () => {
  const [selection, setSelection] = useState<string[]>([]);

  const rows = items.map((item) => (
    <Table.Row
      key={item.name}
      data-selected={selection.includes(item.name) ? "" : undefined}
      className="border-b border-gray-300 hover:bg-gray-100 transition-all"
    >
      <Table.Cell className="py-2 px-4">
        <Checkbox
          aria-label="Select row"
          checked={selection.includes(item.name)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes.checked
                ? [...prev, item.name]
                : selection.filter((name) => name !== item.name)
            );
          }}
        />
      </Table.Cell>
      <Table.Cell className="py-2 px-2">{item.name}</Table.Cell>
      <Table.Cell className="py-2 px-40">{item.category}</Table.Cell>
      <Table.Cell className="py-2 px-6">${item.price}</Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      <Table.Root className="mt-4 border border-gray-300 rounded-md ">
        <Table.Header className="bg-beige text-white">
          <Table.Row>
            <Table.ColumnHeader className="py-4 px-4">
              
            </Table.ColumnHeader>
            <Table.ColumnHeader className="py-2 px-2 text-center">Nama Penyakit</Table.ColumnHeader>
            <Table.ColumnHeader className="py-2 px-40 text-center">Nama Gejala</Table.ColumnHeader>
            <Table.ColumnHeader className="py-2 px-40 text-center">Cara Pengendalian</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table.Root>

    </>
  );
};

const items = [
  { id: 1, name: "Bulai", category: "bercak", price: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco" },
];

export default TableHasilDiagnosa;
