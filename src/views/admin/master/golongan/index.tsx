'use client';

import axios from 'axios';
import toast from 'react-hot-toast';
import Table from './table';
import { Title } from 'rizzui';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { DATA_GOLONGAN } from '@/types/master/golongan/type';
import { useEffect, useState } from 'react';

export default function GolonganView() {
  const router = useRouter();
  const [cookies] = useCookies<string>(['accessToken']);
  const [golonganList, setGolonganList] = useState<DATA_GOLONGAN[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteData, setIsDeleteData] = useState<boolean>(false);

  useEffect(() => {
    const fetchGolonganData = async () => {
      setIsLoading(true);
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const res = await axios.get(
          `${process.env.API_URL}/api/master/golongan`,
          {
            headers,
          }
        );

        setGolonganList(res?.data?.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error: fetch data golongan', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGolonganData();
  }, [cookies.accessToken]);

  const handleDeleteGolongan = async (id: string) => {
    setIsLoading(true);
    try {
      const accessToken = cookies.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const res = await axios.delete(
        `${process.env.API_URL}/api/master/golongan/${id}`,
        { headers }
      );
      if (res.status === 200) {
        toast.success('Golongan berhasil dihapus!');
        setGolonganList((prevList: DATA_GOLONGAN[]) =>
          prevList.filter((item: DATA_GOLONGAN) => item.id !== id)
        );

        router.refresh();
        setIsDeleteData(true);
      }
    } catch (error: any) {
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
      <Table data={golonganList} onDeleteData={handleDeleteGolongan} />
    </>
  );
}
