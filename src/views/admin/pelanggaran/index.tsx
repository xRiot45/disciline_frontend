'use client';

import axios from 'axios';
import Table from './table';
import { Title } from 'rizzui';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { DATA_PELANGGARAN } from '@/types/pelanggaran/type';
import { useEffect, useState } from 'react';

export default function PelanggaranView() {
  const router = useRouter();
  const [cookies] = useCookies(['accessToken']);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pelanggaranList, setPelanggaranList] = useState<DATA_PELANGGARAN[]>(
    []
  );

  useEffect(() => {
    const fetchPelanggaranData = async () => {
      setIsLoading(true);
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const res = await axios.get(`${process.env.API_URL}/api/pelanggaran`, {
          headers,
        });

        setPelanggaranList(res?.data?.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPelanggaranData();
  }, [cookies.accessToken]);

  // Delete data

  if (isLoading) {
    return (
      <div className="mx-auto flex justify-center ">
        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    );
  }

  return (
    <>
      <Table data={pelanggaranList} />
    </>
  );
}
