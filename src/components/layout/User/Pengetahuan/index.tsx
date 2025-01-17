"use client";

import React from "react";
import CardMenu from "../../../fragments/CardMenu";
import Navbar from "../../../fragments/Navbar";
import Footer from "../../../fragments/Footer";
import CardPengetahuan from "../../../fragments/CardPengetahuan";

const PengetahuanLayout = () => {
  const cardData = [
    {
      id: 1,
      title: "Busuk Daun",
      description: "Lorem ipsum dolor sit amet...",
    },
    {
      id: 2,
      title: "Busuk Daun",
      description: "Lorem ipsum dolor sit amet...",
    },
    {
      id: 3,
      title: "Busuk Daun",
      description: "Lorem ipsum dolor sit amet...",
    },
    {
      id: 4,
      title: "Busuk Daun",
      description: "Lorem ipsum dolor sit amet...",
    },
    {
      id: 5,
      title: "Busuk Daun",
      description: "Lorem ipsum dolor sit amet...",
    },
    {
      id: 6,
      title: "Busuk Daun",
      description: "Lorem ipsum dolor sit amet...",
    },
  ];

  return (
    <>
      <div className="flex min-h-screen ">
        <CardMenu />
        <main className="flex-1 p-6 sm:ml-[260px]">
          <Navbar title="Overview Pengetahuan" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cardData.map((card) => (
            <CardPengetahuan
              key={card.id}
              title={card.title}
              description={card.description}
            />
          ))}
          </div>
          
          <Footer />
        </main>
      </div>
    </>
  );
};

export default PengetahuanLayout;
