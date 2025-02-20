"use client";

import { useState, useEffect, useCallback } from "react";
import { Table, Input, Button } from "@chakra-ui/react";
import { FaPenSquare, FaTrash } from "react-icons/fa";
import ButtonElement from "../../elements/ButtonElement";
import axios from "axios";
import { DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface TableRelasiProps {
  searchQuery: string;
  refreshTable: boolean;
  setRefreshTable: (value: boolean) => void;
}

interface Solution {
  id: number;
  description: string;
}

const TableRelasi: React.FC<TableRelasiProps> = ({ searchQuery, refreshTable, setRefreshTable }) => {
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [editDescription, setEditDescription] = useState("");
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState<string>("");
  const [deleteId, setDeleteId] = useState<number | null>(null); // New state for delete confirmation

  // Memoize the fetch function to prevent unnecessary re-renders
  const fetchSolutions = useCallback(() => {
    axios
      .get("/api/admin/solution")
      .then((res) => setSolutions(res.data))
      .catch((err) => console.error("Error fetching solutions:", err));
  }, []);

  useEffect(() => {
    fetchSolutions();
  }, [refreshTable, fetchSolutions]);

  // Memoize the filtered items
  const filteredItems = searchQuery ? solutions.filter((item) => item.id.toString().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase())) : solutions;

  const handleDelete = async (id: number) => {
    try {
      await axios.delete("/api/admin/solution", { data: { id } });
      setSolutions((prevSolutions) => prevSolutions.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting solution:", error);
    } finally {
      setDeleteId(null); // Close the delete confirmation dialog
    }
  };

  const handleEdit = (id: number, description: string) => {
    setEditId(id);
    setEditDescription(description);
  };

  const handleUpdateSolution = async () => {
    if (!editId || !editDescription.trim()) {
      return setError("Description cannot be empty!");
    }

    try {
      await axios.put("/api/admin/solution", { id: editId, description: editDescription });
      setEditId(null);
      setEditDescription("");
      setRefreshTable(!refreshTable);
      document.getElementById("close-edit-dialog")?.click();
    } catch (error) {
      console.error("Error updating solution:", error);
    }
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditDescription(e.target.value);
  };

  return (
    <>
      <Table.Root className="mt-4 border border-gray-300" size={"lg"} striped>
        <Table.Header className="bg-beige text-white">
          <Table.Row>
            <Table.ColumnHeader>No</Table.ColumnHeader>
            <Table.ColumnHeader>Nama Solusi</Table.ColumnHeader>
            <Table.ColumnHeader>Aksi</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {filteredItems.map((item, index) => (
            <Table.Row key={item.id} className="border-b border-gray-300 hover:bg-gray-100">
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{item.description}</Table.Cell>
              <Table.Cell>
                <div className="flex flex-row gap-2">
                  {/* Edit Button */}
                  <DialogRoot placement={"center"}>
                    <DialogTrigger asChild>
                      <ButtonElement bg="bg-gold" label="Edit" icon={FaPenSquare} variant="outline" colorScheme="teal" onClick={() => handleEdit(item.id, item.description)} />
                    </DialogTrigger>
                    <DialogContent className="bg-white text-black">
                      <DialogCloseTrigger id="close-edit-dialog" />
                      <DialogHeader>
                        <DialogTitle className="font-semibold">Edit Solusi</DialogTitle>
                      </DialogHeader>
                      <DialogBody>
                        {error && <p className="text-red-600">{error}</p>}
                        <Input className="px-2 border" value={editDescription} onChange={handleEditInputChange} placeholder="Masukkan nama solusi" />
                      </DialogBody>
                      <DialogFooter>
                        <Button onClick={handleUpdateSolution} className="bg-teal-500 text-white px-2 font-semibold">
                          Simpan Perubahan
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </DialogRoot>

                  {/* Delete Button */}
                  <DialogRoot placement={"center"}>
                    <DialogTrigger asChild>
                      <ButtonElement bg="bg-brick" label="Hapus" icon={FaTrash} variant="outline" colorScheme="teal" onClick={() => setDeleteId(item.id)} />
                    </DialogTrigger>
                    <DialogContent className="bg-white text-black">
                      <DialogHeader>
                        <DialogTitle className="font-semibold">Konfirmasi Penghapusan</DialogTitle>
                      </DialogHeader>
                      <DialogBody>
                        <p>Apakah Anda yakin ingin menghapus solusi ini?</p>
                      </DialogBody>
                      <DialogFooter>
                        <Button
                          onClick={() => {
                            setDeleteId(null);
                            document.getElementById("close-delete-dialog")?.click();
                          }}
                          className="bg-gray-500 text-white px-2 font-semibold"
                        >
                          Batal
                        </Button>
                        <Button onClick={() => handleDelete(deleteId!)} className="bg-red-500 text-white px-2 font-semibold">
                          Hapus
                        </Button>
                      </DialogFooter>
                      <DialogCloseTrigger id="close-delete-dialog" />
                    </DialogContent>
                  </DialogRoot>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default TableRelasi;
