"use client";

import { Table } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";

const TableRiwayat = () => {
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
      <Table.Cell className="py-2 text-center">{item.name}</Table.Cell>
      <Table.Cell className="py-2 px-4 text-center">{item.category}</Table.Cell>
      <Table.Cell className="py-2 px-4 text-center">${item.price}</Table.Cell>
      <Table.Cell className="py-2 px-4 text-center">${item.price}</Table.Cell>
    </Table.Row>
  ));

  return (
    <>
      <Table.Root className="mt-4 border border-gray-300 rounded-md ">
        <Table.Header className="bg-beige text-white items-center text-center">
          <Table.Row>
            <Table.ColumnHeader className="py-4 px-4">
              
            </Table.ColumnHeader>
            <Table.ColumnHeader className="py-2 text-center">No</Table.ColumnHeader>
            <Table.ColumnHeader className="py-2 px-10 text-center">Tanggal</Table.ColumnHeader>
            <Table.ColumnHeader className="py-2 px-20 text-center">Nilai Presentase</Table.ColumnHeader>
            <Table.ColumnHeader className="py-2 px- text-center">Action</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>{rows}</Table.Body>
      </Table.Root>

    </>
  );
};

const items = [
  { id: 1, name: "1", category: "01/02/23", price: 999.99 },
  { id: 2, name: "2", category: "01/02/23 ", price: 49.99 },
  { id: 3, name: "3", category: "01/02/23", price: 150.0 },
  { id: 4, name: "4", category: "01/02/23", price: 799.99 },
  { id: 5, name: "5", category: "01/02/23", price: 199.99 },
];

export default TableRiwayat;
