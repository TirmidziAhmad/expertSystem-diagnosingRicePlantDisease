'use client';

import React from 'react';
import CardMenu from '../../../fragments/CardMenu';
import Navbar from '../../../fragments/Navbar';
import Hero from '../../../fragments/Hero';
import Footer from '../../../fragments/Footer';
import TableDiagnosa from '../../../fragments/Table/TableDiagnosa';
import { FaSearch } from 'react-icons/fa';
import ButtonElement from '../../../elements/ButtonElement';

const DiagnosaLayout = () => {
  return (
    <>
      <div className='flex min-h-screen '>
        <CardMenu />
        <main className='flex-1 p-6 sm:ml-[260px]'>
          <Navbar title='Diagnosa' />
          <section className='mt-4'>
            <Hero
              title=''
              subtitle='Silahkan memilih gejala yang sesuai dengan kondisi tanaman padi anda, 
                dengan memberikan tanda     . Jika sudah sesuai klik button mula diagnosa.'
              imageSrc='/total-pengetahuan.svg'
            />
          </section>
          <TableDiagnosa />
          <ButtonElement bg='bg-olive' label='Mulai Diagnosa' icon={FaSearch} variant='outline' colorScheme='teal' link='/User/HasilDiagnosa' />
          <Footer />
        </main>
      </div>
    </>
  );
};

export default DiagnosaLayout;
