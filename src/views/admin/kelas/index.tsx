'use client';

import axios from 'axios';
import Table from './table';
import toast from 'react-hot-toast';
import { Title } from 'rizzui';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { DATA_KELAS } from '@/types/kelas/type';
import { useEffect, useState } from 'react';

export default function KelasView() {
  const router = useRouter();
  const [cookies] = useCookies<string>(['accessToken']);
  const [kelasList, setKelasList] = useState<DATA_KELAS[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteData, setIsDeleteData] = useState<boolean>(false);

  useEffect(() => {
    const fetchKelasData = async () => {
      setIsLoading(true);
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const res = await axios.get(`${process.env.API_URL}/api/kelas`, {
          headers,
        });

        setKelasList(res?.data?.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKelasData();
  }, [cookies.accessToken]);

  const handleDeleteKelas = async (id: string) => {
    setIsLoading(true);
    try {
      const accessToken = cookies.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const res = await axios.delete(`${process.env.API_URL}/api/kelas/${id}`, {
        headers,
      });
      if (res.status === 200) {
        toast.success('Kelas berhasil dihapus!');
        setKelasList((prevList: any) =>
          prevList.filter((item: any) => item.id !== id)
        );

        router.refresh();
        setIsDeleteData(true);
      }
    } catch (error) {
      console.log(error);
      toast.error('Terjadi kesalahan saat menghapus data, silahkan coba lagi!');
    } finally {
      setIsLoading(false);
    }
  };

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
      <Table data={kelasList} onDeleteData={handleDeleteKelas} />
    </>
  );
}
