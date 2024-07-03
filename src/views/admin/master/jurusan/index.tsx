'use client';

import toast from 'react-hot-toast';
import axios from 'axios';
import Table from './table';
import { Title } from 'rizzui';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { DATA_JURUSAN } from '@/types/master/jurusan/type';
import { useEffect, useState } from 'react';

export default function JurusanView() {
  const router = useRouter();
  const [cookies] = useCookies<string>(['accessToken']);
  const [jurusanList, setJurusanList] = useState<DATA_JURUSAN[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteData, setIsDeleteData] = useState<boolean>(false);

  useEffect(() => {
    const fetchJurusanData = async () => {
      setIsLoading(true);
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const res = await axios.get(
          `${process.env.API_URL}/api/master/jurusan`,
          {
            headers,
          }
        );

        setJurusanList(res?.data?.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJurusanData();
  }, [cookies.accessToken]);

  const handleDeleteJurusan = async (id: string) => {
    setIsLoading(true);
    try {
      const accessToken = cookies.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const res = await axios.delete(
        `${process.env.API_URL}/api/master/jurusan/${id}`,
        { headers }
      );
      if (res.status === 200) {
        toast.success('Jurusan berhasil dihapus!');
        setJurusanList((prevList: DATA_JURUSAN[]) =>
          prevList.filter((item: DATA_JURUSAN) => item.id !== id)
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
      <Table data={jurusanList} onDeleteData={handleDeleteJurusan} />
    </>
  );
}
