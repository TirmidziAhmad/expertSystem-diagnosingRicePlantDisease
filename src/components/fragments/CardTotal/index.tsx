import { Box, Flex, Text, Image } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import axios from 'axios';

const CardTotal: React.FC = () => {
  const [totalGejala, setTotalGejala] = useState(0);
  const [totalPenyakit, setTotalPenyakit] = useState(0);
  const [totalPengetahuan, setTotalPengetahuan] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/user/overview/overviewdata');
        setTotalGejala(response.data.symptoms);
        setTotalPenyakit(response.data.diseases);
        setTotalPengetahuan(response.data.pengetahuan);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  });
  return (
    <div className='mt-3 gap-3 w-full flex '>
      <Box className={`bg-beige border rounded-lg p-5 w-full justify-center items-center`}>
        <Flex direction='row' align='center' justify='flex-start'>
          <Image src='/total-gejala.svg' alt='gejala' className='w-16 mr-4' />
          <Flex direction='column' ml={6} color='white'>
            <Text className='text-xl font-semibold'>Total Gejala</Text>
            <Text className='text-2xl font-bold'>{totalGejala}</Text>
          </Flex>
        </Flex>
      </Box>
      <Box className={`bg-olive border rounded-lg p-5 w-full justify-center items-center`}>
        <Flex direction='row' align='center' justify='flex-start'>
          <Image src='/total-penyakit.svg' alt='gejala' className='w-16 mr-4' />
          <Flex direction='column' ml={6} color='white'>
            <Text className='text-xl font-semibold'>Total Penyakit</Text>
            <Text className='text-2xl font-bold'>{totalPenyakit}</Text>
          </Flex>
        </Flex>
      </Box>
      <Box className={`bg-sand border rounded-lg p-5 w-full justify-center items-center`}>
        <Flex direction='row' align='center' justify='flex-start'>
          <Image src='/total-pengetahuan.svg' alt='gejala' className='w-16 mr-4' />
          <Flex direction='column' ml={6} color='white' className='justify-center'>
            <Text className='text-xl font-semibold'>Total Pengetahuan</Text>
            <Text className='text-2xl font-bold'>{totalPengetahuan}</Text>
          </Flex>
        </Flex>
      </Box>
    </div>
  );
};

export default CardTotal;
