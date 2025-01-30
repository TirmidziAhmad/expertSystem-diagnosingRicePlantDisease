'use client';

import React from 'react';
import CardMenu from '../../../fragments/CardMenu';
import Navbar from '../../../fragments/Navbar';
import Footer from '../../../fragments/Footer';
import TableDiagnosa from '../../../fragments/Table/TableHasilDiagnosa';
import { useDiagnose } from '@/context/diagnoseContext';

const HasilDiagnosaa = () => {
  const { diagnoseData } = useDiagnose();

  return (
    <>
      <div className='flex min-h-screen '>
        <CardMenu />
        <main className='flex-1 p-6 sm:ml-[260px]'>
          <Navbar title='Hasil Diagnosa' />
          <div className='mt-4 text-center'>
            <div className='text-xl'>Berdasarkan gejala yang dipilih, Tanaman Padi anda kemungkinan terkena penyakit</div>
            <h1 className='text-3xl font-semibold mt-2'>Nama Penyakit: {diagnoseData?.mostLikelyDisease ?? 'Penyakit Tidak Ditemukan'}</h1>
            <p className='text-xl mt-2'>Dengan nilai kepercayan tertinggi yaitu {(diagnoseData?.highestProbability * 100).toFixed(2) ?? 0}%</p>
            <p>Nilai kepercayaan penyakit lainnya:</p>
            <ul className='list-disc pl-6'>
              {Object.entries(diagnoseData?.allProbabilities ?? {}).map(([disease, probability]) => (
                <li key={disease}>
                  {disease}: <span className='font-bold'>{(probability * 100).toFixed(2)}%</span>
                </li>
              ))}
            </ul>
          </div>
          <TableDiagnosa />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default HasilDiagnosaa;
