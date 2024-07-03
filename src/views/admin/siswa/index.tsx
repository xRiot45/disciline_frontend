'use client';

import axios from 'axios';
import toast from 'react-hot-toast';
import Table from './table';
import { Title } from 'rizzui';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { DATA_SISWA } from '@/types/siswa/type';
import { useEffect, useState } from 'react';

export default function SiswaView() {
  const router = useRouter();
  const [cookies] = useCookies<string>(['accessToken']);
  const [siswaList, setSiswaList] = useState<DATA_SISWA[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteData, setIsDeleteData] = useState<boolean>(false);

  useEffect(() => {
    const fetchSiswaData = async () => {
      setIsLoading(true);
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const res = await axios.get(`${process.env.API_URL}/api/siswa`, {
          headers,
        });

        setSiswaList(res?.data?.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSiswaData();
  }, [cookies.accessToken]);

  const handleDeleteData = async (id: string) => {
    setIsLoading(true);
    try {
      const accessToken = cookies.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const res = await axios.delete(`${process.env.API_URL}/api/siswa/${id}`, {
        headers,
      });
      if (res.status === 200) {
        toast.success('Siswa berhasil dihapus!');
        setSiswaList((prevList: DATA_SISWA[]) =>
          prevList.filter((item: DATA_SISWA) => item.id !== id)
        );

        router.refresh();
        setIsLoading(true);
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
      <Table data={siswaList} onDeleteData={handleDeleteData} />
    </>
  );
}
