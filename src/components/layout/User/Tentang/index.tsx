"use client";

import React from "react";
import CardMenu from "../../../fragments/CardMenu";
import Navbar from "../../../fragments/Navbar";
import Footer from "../../../fragments/Footer";

const TentangLayout = () => {
  return (
    <>
      <div className="flex min-h-screen ">
        <CardMenu />
        <main className="flex-1 p-6 sm:ml-[260px]">
          <Navbar title="Tentang Sistem" />
          <div className="mt-20 flex flex-row justify-center items-center ">
            <img className="w-30 h-20" src="/logo.svg" alt="Logo" />
            <h1 className="text-6xl font-bold text-olive mt-4">ESRDP</h1>
          </div>
          <div className=" mt-10 flex flex-col justify-center items-start ">
            <h1 className="font-bold text-xl">Deskripsi Sistem</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nobis nostrum fuga iste adipisci quis optio magnam, quae excepturi recusandae quasi aliquam voluptatem veniam. Velit, cumque. Aspernatur, labore ratione? Non.</p>
          </div>
          <div className=" mt-6 flex flex-col justify-center items-start ">
            <h1 className="font-bold text-xl">Cara Menggunakan Sistem</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta nobis nostrum fuga iste adipisci quis optio magnam, quae excepturi recusandae quasi aliquam voluptatem veniam. Velit, cumque. Aspernatur, labore ratione? Non.</p>
          </div>
          <Footer />
        </main>
      </div>
    </>
  );
};

export default TentangLayout;
