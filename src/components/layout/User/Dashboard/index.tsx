'use client';

import React from 'react';
import CardMenu from '../../../fragments/CardMenu';
import Navbar from '../../../fragments/Navbar';
import Hero from '../../../fragments/Hero';
import CardTotal from '../../../fragments/CardTotal';
import Footer from '../../../fragments/Footer';
// import dynamic from 'next/dynamic';
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react';
// const Chart = dynamic(() => import('../../../fragments/Chart'), { ssr: false });

const DashboardLayout: React.FC = () => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    setUsername(Cookies.get('username') || '');
  }, []);

  return (
    <>
      <div className='flex min-h-screen'>
        <CardMenu />
        <main className='flex-1 p-6 sm:ml-[260px]'>
          <Navbar title='Overview Dashboard' />
          <section className='mt-4'>
            <Hero title={'Hi, ' + username} subtitle='Selamat datang di Sistem Pakar Diagnosa Penyakit Pada Tanaman Padi' imageSrc='/image.svg' />
            <div className='flex flex-col sm:flex-row gap-4 mt-3'>
              <CardTotal />
              {/* <Chart /> */}
            </div>
          </section>
          <Footer />
        </main>
      </div>
    </>
  );
};

export default DashboardLayout;
