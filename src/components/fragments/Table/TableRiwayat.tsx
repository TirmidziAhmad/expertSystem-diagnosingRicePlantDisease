'use client';

import { Table, Button } from '@chakra-ui/react';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import parseFloatToPercentage from '@/lib/parseFloatToPercentage';
import parseDate from '@/lib/parseDate';
import { DialogBody, DialogCloseTrigger, DialogContent, DialogFooter, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface dataProps {
  id: number;
  results: string | number;
  createdAt: string;
}
const TableRiwayat = () => {
  const tableHeader = useMemo(() => ['No', 'Penyakit', 'Tanggal', 'Nilai Presentase', 'Action'], []);
  const userId = Cookies.get('userId');
  const [data, setData] = useState<dataProps[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/user/history/${userId}`);
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    if (userId) fetchData();
  }, [userId]);

  return (
    <>
      <DialogRoot placement={'center'}>
        <Table.Root striped interactive size='lg' className='mt-4 border'>
          <Table.Header className='  items-center text-center'>
            <Table.Row>
              {tableHeader.map((item, index) => (
                <Table.ColumnHeader key={index} className='bg-[#A38A41] text-white '>
                  {item}
                </Table.ColumnHeader>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {data.map((item, index) => {
              const diseaseEntries = Object.entries(item.results);
              const [firstDisease, firstValue] = diseaseEntries.length > 0 ? diseaseEntries[0] : ['-', 0];

              return (
                <Table.Row key={item.id} className='bg-white'>
                  <Table.Cell>{index + 1}</Table.Cell>
                  <Table.Cell>{firstDisease}</Table.Cell>
                  <Table.Cell>{parseDate(item.createdAt)}</Table.Cell>
                  <Table.Cell>{parseFloatToPercentage(firstValue)}</Table.Cell>
                  <Table.Cell>
                    <DialogTrigger asChild>
                      <Button className='bg-[#352802] text-white px-3 font-semibold'>Detail</Button>
                    </DialogTrigger>
                  </Table.Cell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table.Root>
        <DialogContent className='bg-[#FFFDF9] text-[#352802]'>
          <DialogHeader>
            <DialogTitle className='font-bold'>Detail Riwayat Konsultasi</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
            <p></p>
          </DialogBody>
          <DialogFooter></DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  );
};

export default TableRiwayat;
