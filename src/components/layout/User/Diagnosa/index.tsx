'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CardMenu from '../../../fragments/CardMenu';
import Navbar from '../../../fragments/Navbar';
import Hero from '../../../fragments/Hero';
import Footer from '../../../fragments/Footer';
import TableDiagnosa from '../../../fragments/Table/TableDiagnosa';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Button } from '@chakra-ui/react';
import { useDiagnose } from '@/context/diagnoseContext';

const DiagnosaLayout: React.FC = () => {
  const router = useRouter();
  const { setDiagnoseData } = useDiagnose();
  const userId = Number(Cookies.get('userId'));

  const [selectedSymptomCodes, setSelectedSymptomCodes] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelectedSymptomCodes = (codes: string[]) => {
    setSelectedSymptomCodes(codes);
  };

  const handleButtonDiagnose = async () => {
    if (selectedSymptomCodes.length === 0) {
      setError('Please select at least one symptom');
      return;
    }

    if (isNaN(userId)) {
      setError('Invalid user ID');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('/api/user/diagnose', {
        userId,
        symptoms: selectedSymptomCodes,
      });

      console.log('Response received:', response.data);

      // Save diagnosis data to context
      setDiagnoseData({
        allProbabilities: response.data.allProbabilities,
        highestProbability: response.data.highestProbability,
        mostLikelyDisease: response.data.mostLikelyDisease,
      });

      // Navigate to results page
      router.push('/user/hasildiagnosa');
    } catch (error: any) {
      setError(error.response?.data?.message || 'An error occurred during diagnosis');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex min-h-screen'>
      <CardMenu />
      <main className='flex-1 p-6 sm:ml-[260px]'>
        <Navbar title='Diagnosa' />
        <section className='mt-4'>
          <Hero title='' subtitle='Silahkan memilih gejala yang sesuai dengan kondisi tanaman padi anda...' imageSrc='/total-pengetahuan.svg' />
        </section>

        <TableDiagnosa selectedSymptomCodes={handleSelectedSymptomCodes} />

        {error && <div className='mt-2 text-red-600'>{error}</div>}

        <div className='flex justify-end mt-3'>
          <Button variant='outline' className='bg-[#352802] text-white px-3 font-semibold hover:bg-[#4A3C18]' onClick={handleButtonDiagnose} disabled={isLoading}>
            {isLoading ? 'Memproses...' : `Mulai Diagnosa`}
            <FaSearch />
          </Button>
        </div>

        <Footer />
      </main>
    </div>
  );
};

export default DiagnosaLayout;
