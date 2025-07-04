"use client";

import { Table } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useMemo, useEffect } from "react";
import axios from "axios";

//create interface for selectedsymptomcodes
interface SelectedSymptomCodes {
  (codes: string[]): void;
}

const TableDiagnosa = ({ selectedSymptomCodes }: { selectedSymptomCodes: SelectedSymptomCodes }) => {
  const tableHeader = useMemo(() => ["No", "Kode Gejala", "Nama Gejala", "Checkbox"], []);
  const [tableData, setTableData] = useState<{ code: string; description: string }[]>([]);
  const [selectedCodes, setSelectedCodes] = useState<string[]>([]);

  const handleCheckboxChange = (code: string, isChecked: boolean) => {
    const updatedCodes = isChecked
      ? [...new Set([...selectedCodes, code])] // Use Set to ensure uniqueness when adding
      : selectedCodes.filter((c) => c !== code); // Remove if unchecked

    setSelectedCodes(updatedCodes);
    selectedSymptomCodes(updatedCodes); // Pass data to parent
  };

  useEffect(() => {
    const fetchTableData = async () => {
      try {
        const response = await axios.get("/api/user/symptoms");
        setTableData(response.data);
      } catch (error) {
        console.error("Error fetching table data:", error);
      }
    };

    fetchTableData();
  }, []);

  return (
    <>
      <Table.Root className="mt-4 w-full border rounded-lg" size="lg" striped stickyHeader>
        <Table.Header className="bg-beige text-white rounded-md">
          <Table.Row>
            {tableHeader.map((item, index) => (
              <Table.ColumnHeader key={index} className="bg-beige text-white">
                {item}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {tableData.map((item, index) => (
            <Table.Row key={index}>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{item.code}</Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell>
                <Checkbox variant="subtle" checked={selectedCodes.includes(item.code)} onCheckedChange={(event) => handleCheckboxChange(item.code, !!event.checked)} />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default TableDiagnosa;
