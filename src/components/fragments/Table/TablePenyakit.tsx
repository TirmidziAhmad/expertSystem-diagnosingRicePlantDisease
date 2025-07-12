"use client";

import { useMemo } from "react";
import Image from "next/image";
import { FaPenSquare, FaTrash } from "react-icons/fa";
import ButtonElement from "../../elements/ButtonElement";

// Re-defined interfaces to ensure consistency with PenyakitLayout
interface Symptom {
  id: number;
  description: string;
}

interface Solution {
  id: number;
  description: string;
}

interface TablePenyakitProps {
  searchQuery: string;
  diseases: {
    id: number;
    name: string;
    image: string; // URL of the image
    description: string;
    symptoms: { symptom: Symptom; probability: number }[]; // symptom object
    solutions: { solution: Solution }[]; // solution object
  }[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const TablePenyakit: React.FC<TablePenyakitProps> = ({
  searchQuery,
  diseases,
  onEdit,
  onDelete,
}) => {
  const tableHeader = useMemo(
    () => [
      "No",
      "Gambar",
      "Nama Penyakit",
      "Deskripsi",
      "Gejala",
      "Pengendalian",
      "Action",
    ],
    []
  );

  const filteredItems = diseases.filter(
    (item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.symptoms.some((s) =>
        s.symptom.description.toLowerCase().includes(searchQuery.toLowerCase())
      ) ||
      item.solutions.some((s) =>
        s.solution.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  return (
    <table className="mt-4 w-full border border-gray-300 text-sm">
      <thead className="bg-beige text-white">
        <tr>
          {tableHeader.map((header, index) => (
            <th key={index} className="px-4 py-2 text-left border-b">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {filteredItems.length === 0 ? (
          <tr>
            <td colSpan={tableHeader.length} className="text-center py-4">
              Tidak ada data penyakit ditemukan.
            </td>
          </tr>
        ) : (
          filteredItems.map((item, index) => (
            <tr
              key={item.id}
              className="border-b border-gray-300 hover:bg-gray-100 transition-all"
            >
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">
                {item.image && (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={80}
                    height={80}
                    className="object-cover rounded"
                  />
                )}
              </td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">{item.description}</td>
              <td className="px-4 py-2">
                <ul className="list-disc list-inside space-y-1">
                  {item.symptoms.map((s, i) => (
                    <li key={i}>
                      {s.symptom.description} ({s.probability.toFixed(2)})
                    </li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-2">
                <ul className="list-disc list-inside space-y-1">
                  {item.solutions.map((s, i) => (
                    <li key={i}>{s.solution.description}</li>
                  ))}
                </ul>
              </td>
              <td className="px-4 py-2">
                <div className="flex flex-row gap-2">
                  <ButtonElement
                    bg="bg-gold"
                    label="Edit"
                    icon={FaPenSquare}
                    variant="outline"
                    colorScheme="teal"
                    onClick={() => onEdit(item.id)}
                  />
                  <ButtonElement
                    bg="bg-brick"
                    label="Hapus"
                    icon={FaTrash}
                    variant="outline"
                    colorScheme="teal"
                    onClick={() => onDelete(item.id)}
                  />
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default TablePenyakit;
