import React from "react";

interface CardPengetahuanProps {
  title: string;
  description: string;
}

const CardPengetahuan: React.FC<CardPengetahuanProps> = ({ title, description }) => {
  return (
    <div className="bg-white shadow-sm shadow-dark rounded-lg p-4 border mt-4">
      <img
        src="/image.svg"
        alt={title}
        className="rounded-lg mb-4"
      />
      <h3 className="text-lg font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <button className="bg-olive font-semibold text-white px-4 py-2 rounded hover:bg-yellow-600">
        Detail
      </button>
    </div>
  );
};

export default CardPengetahuan;