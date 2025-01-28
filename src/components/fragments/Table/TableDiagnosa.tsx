'use client';

import { Table } from '@chakra-ui/react';
import { Checkbox } from '@/components/ui/checkbox';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
const TableDiagnosa = () => {
  const tableHeader = useMemo(() => ['No', 'Kode Gejala', 'Nama Gejala', 'Checkbox'], []);
  const [data, setData] = useState<{ code: string; name: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/user/symptoms');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Table.Root className='mt-4  w-full border  rounded-lg' size='lg' striped stickyHeader>
        <Table.Header className='bg-beige text-white rounded-md '>
          <Table.Row className=''>
            {tableHeader.map((item, index) => (
              <Table.ColumnHeader key={index} className='bg-beige text-white '>
                {item}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item, index) => (
            <Table.Row key={index} className=''>
              <Table.Cell className=''>{index + 1}</Table.Cell>
              <Table.Cell className=''>{item.code}</Table.Cell>
              <Table.Cell className=''>{item.name}</Table.Cell>
              <Table.Cell className=''>
                <Checkbox variant='subtle' />
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default TableDiagnosa;
