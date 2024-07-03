'use client';

import axios from 'axios';
import Table from './table';
import toast from 'react-hot-toast';
import { Title } from 'rizzui';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { DATA_PENDIDIKAN } from '@/types/master/pendidikan/type';
import { useEffect, useState } from 'react';

export default function PendidikanView() {
  const router = useRouter();
  const [cookies] = useCookies<string>(['accessToken']);
  const [pendidikanList, setPendidikanList] = useState<DATA_PENDIDIKAN[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteData, setIsDeleteData] = useState<boolean>(false);

  useEffect(() => {
    const fetchPendidikanData = async () => {
      setIsLoading(true);
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const res = await axios.get(
          `${process.env.API_URL}/api/master/pendidikan`,
          {
            headers,
          }
        );

        setPendidikanList(res?.data?.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching pendidikan data: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendidikanData();
  }, [cookies.accessToken]);

  const handleDeletePendidikan = async (id: string) => {
    setIsLoading(true);
    try {
      const accessToken = cookies.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const res = await axios.delete(
        `${process.env.API_URL}/api/master/pendidikan/${id}`,
        { headers }
      );
      if (res.status === 200) {
        toast.success('Pendidikan berhasil dihapus!');
        setPendidikanList((prevList: DATA_PENDIDIKAN[]) =>
          prevList.filter((item: DATA_PENDIDIKAN) => item.id !== id)
        );

        router.refresh();
        setIsDeleteData(true);
      }
    } catch (error: any) {
      console.error('Error fetching pendidikan data: ', error);
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
      <Table data={pendidikanList} onDeleteData={handleDeletePendidikan} />
    </>
  );
}
