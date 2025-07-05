"use client";

import { Table } from "@chakra-ui/react";
import { Checkbox } from "@/components/ui/checkbox";
import { useState, useEffect } from "react";
import { FaPenSquare } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import ButtonElement from "../../elements/ButtonElement";
import axios from "axios";

interface GejalaItem {
  id: number;
  code: string;
  description: string;
}

interface TableGejalaProps {
  searchQuery: string;
  refreshTable: boolean;
  setRefreshTable: React.Dispatch<React.SetStateAction<boolean>>;
  onEdit: (item: GejalaItem) => void;
}

const TableGejala: React.FC<TableGejalaProps> = ({
  searchQuery,
  refreshTable,
  setRefreshTable,
  onEdit,
}) => {
  const [gejala, setGejala] = useState<GejalaItem[]>([]);
  const [selection, setSelection] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGejala = async () => {
      try {
        setLoading(true);
        const response = await axios.get("/api/admin/symptom");
        setGejala(response.data);
      } catch (err) {
        console.error("Error fetching gejala:", err);
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchGejala();
  }, []);

  const fetchGejala = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/admin/symptom");
      setGejala(response.data);
    } catch (err) {
      console.error("Error fetching gejala:", err);
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGejala();
  }, []);

  useEffect(() => {
    fetchGejala();
  }, [refreshTable]);

  const handleDelete = async (id: number) => {
    try {
      await axios.delete("/api/admin/symptom", { data: { id } });
      setRefreshTable((prev) => !prev);
    } catch (err) {
      console.error("Gagal menghapus gejala", err);
    }
  };

  const filteredItems = gejala.filter(
    (item) =>
      item?.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item?.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const rows = filteredItems.map((item) => (
    <Table.Row
      key={item.code}
      data-selected={selection.includes(item.code) ? "" : undefined}
      className="border-b border-gray-300 hover:bg-gray-100 transition-all"
    >
      <Table.Cell className="py-2 px-4">
        <Checkbox
          aria-label="Select row"
          checked={selection.includes(item.code)}
          onCheckedChange={(changes) => {
            setSelection((prev) =>
              changes
                ? [...prev, item.code]
                : prev.filter((code) => code !== item.code)
            );
          }}
        />
      </Table.Cell>
      <Table.Cell className="py-2 px-4">{item.code}</Table.Cell>
      <Table.Cell className="py-2 px-4">{item.description}</Table.Cell>
      <Table.Cell className="py-2 px-4">
        <div className="flex flex-row gap-2">
          <ButtonElement
            bg="bg-brick"
            label="Edit"
            icon={FaPenSquare}
            variant="outline"
            colorScheme="teal"
            onClick={() => onEdit(item)}
          />
          <ButtonElement
            bg="bg-gold"
            label="Hapus"
            icon={FaTrash}
            variant="outline"
            colorScheme="teal"
            onClick={() => handleDelete(item.id)}
          />
        </div>
      </Table.Cell>
    </Table.Row>
  ));

  return (
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
  );
};

export default TableGejala;
