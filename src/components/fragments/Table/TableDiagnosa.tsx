"use client";

import { Table } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const TableDiagnosa = () => {
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
      <Table.Cell className="py-2 px-4">{item.name}</Table.Cell>
      <Table.Cell className="py-2 px-4">{item.category}</Table.Cell>
      <Table.Cell className="py-2 px-4">${item.price}</Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      <Table.Root className="mt-4 border border-gray-300 rounded-md ">
        <Table.Header className="bg-beige text-white">
          <Table.Row>
            <Table.ColumnHeader className="py-4 px-4">
              
            </Table.ColumnHeader>
            <Table.ColumnHeader className="py-2 px-4 text-left">Kode Gejala</Table.ColumnHeader>
            <Table.ColumnHeader className="py-2 px-80 text-left">Nama Gejala</Table.ColumnHeader>
            <Table.ColumnHeader className="py-2 px-12 text-left">Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table.Root>

    </>
  );
};

const items = [
  { id: 1, name: "G001", category: "Hawar Daun", price: 999.99 },
  { id: 2, name: "G002", category: "Wereng ", price: 49.99 },
  { id: 3, name: "G003", category: "Furniture", price: 150.0 },
  { id: 4, name: "G004", category: "Electronics", price: 799.99 },
  { id: 5, name: "G005", category: "Accessories", price: 199.99 },
];

export default TableDiagnosa;
