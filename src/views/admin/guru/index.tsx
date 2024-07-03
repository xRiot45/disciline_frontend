'use client';

import axios from 'axios';
import Table from './table';
import toast from 'react-hot-toast';
import { Title } from 'rizzui';
import { DATA_GURU } from '@/types/guru/type';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';

export default function GuruView() {
  const router = useRouter();
  const [cookies] = useCookies(['accessToken']);
  const [guruList, setGuruList] = useState<DATA_GURU[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteData, setIsDeleteData] = useState<boolean>(false);

  useEffect(() => {
    const fetchGuruData = async () => {
      setIsLoading(true);
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const res = await axios.get(`${process.env.API_URL}/api/guru`, {
          headers,
        });

        setGuruList(res?.data?.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuruData();
  }, [cookies.accessToken]);

  const handleDeleteGuru = async (id: string) => {
    setIsLoading(true);
    try {
      const accessToken = cookies.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const res = await axios.delete(`${process.env.API_URL}/api/guru/${id}`, {
        headers,
      });
      if (res.status === 200) {
        toast.success('Guru berhasil dihapus!');
        setGuruList((prevList: DATA_GURU[]) =>
          prevList.filter((item: DATA_GURU) => item.id !== id)
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
      <Table data={guruList} onDeleteData={handleDeleteGuru} />
    </>
  );
}
