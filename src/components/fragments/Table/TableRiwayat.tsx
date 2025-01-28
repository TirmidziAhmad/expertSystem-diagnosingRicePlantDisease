'use client';

import { Table, Button } from '@chakra-ui/react';
import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import parseFloatToPercentage from '@/lib/parseFloatToPercentage';
import parseDate from '@/lib/parseDate';
const TableRiwayat = () => {
  const tableHeader = useMemo(() => ['No', 'Penyakit', 'Tanggal', 'Nilai Presentase', 'Action'], []);
  const userId = Cookies.get('userId');
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`/api/user/history/${userId}`);
        setData(response.data.data);
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <Table.Root striped interactive className='mt-4 border '>
        <Table.Header className='bg-beige text-white items-center text-center'>
          <Table.Row>
            {tableHeader.map((item, index) => (
              <Table.ColumnHeader key={index} className='bg-beige text-white '>
                {item}
              </Table.ColumnHeader>
            ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((item, index) => (
            <Table.Row key={index} className='bg-white'>
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell>{item.results?.possibleDiseases}</Table.Cell>
              <Table.Cell>{parseDate(item.createdAt)}</Table.Cell>
              <Table.Cell>{parseFloatToPercentage(item.results?.probability)}</Table.Cell>
              <Table.Cell>
                <Button className='bg-olive text-white p-3'>Detail</Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default TableRiwayat;
