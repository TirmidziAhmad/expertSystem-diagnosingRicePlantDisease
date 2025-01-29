'use client';

import React from 'react';
import CardMenu from '../../../fragments/CardMenu';
import Navbar from '../../../fragments/Navbar';
import Hero from '../../../fragments/Hero';
import Footer from '../../../fragments/Footer';
import TableDiagnosa from '../../../fragments/Table/TableDiagnosa';
import { FaSearch } from 'react-icons/fa';
import ButtonElement from '../../../elements/ButtonElement';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

const DiagnosaLayout = () => {
  const userId = Cookies.get('userId');
  const [selectedSymptomCodes, setSelectedSymptomCodes] = useState([]);
  const handleSelectedSymptomCodes = (codes) => {
    setSelectedSymptomCodes(codes);
    console.log('Selected Symptom Codes:', codes); // You can handle the selected codes as needed
  };

  useEffect(() => {
    const fetchDiagnoseData = async () => {
      try {
        const response = await axios.get(`/api/user/diagnose/${userId}`);
        const data = response.data;
        console.log('Diagnose Data:', data);
        // You can handle the data as needed
      } catch (error) {
        console.error('Error fetching diagnose data:', error);
      }
    };

    fetchDiagnoseData();
  }, [userId]);

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
          <TableDiagnosa selectedSymptomCodes={handleSelectedSymptomCodes} />
          <div className='flex justify-end mt-3'>
            <ButtonElement bg='bg-olive' label='Mulai Diagnosa' icon={FaSearch} variant='outline' colorScheme='teal' link='/User/HasilDiagnosa' />
          </div>

          <Footer />
        </main>
      </div>
    </>
  );
};

export default DiagnosaLayout;
