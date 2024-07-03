'use client';

import axios from 'axios';
import Table from './table';
import toast from 'react-hot-toast';
import { Title } from 'rizzui';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { DATA_AGAMA } from '@/types/master/agama/type';
import { useEffect, useState } from 'react';

export default function AgamaView() {
  const router = useRouter();
  const [cookies] = useCookies<string>(['accessToken']);
  const [agamaList, setAgamaList] = useState<DATA_AGAMA[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [idDeleteData, setIsDeleteData] = useState<boolean>(false);

  useEffect(() => {
    const fetchAgamaData = async () => {
      setIsLoading(true);
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const res = await axios.get(`${process.env.API_URL}/api/master/agama`, {
          headers,
        });

        setAgamaList(res?.data?.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching agama data: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgamaData();
  }, [cookies.accessToken]);

  const handleDeleteAgama = async (id: string) => {
    setIsLoading(true);
    try {
      const accessToken = cookies.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const res = await axios.delete(
        `${process.env.API_URL}/api/master/agama/${id}`,
        { headers }
      );

      if (res.status === 200) {
        toast.success('Agama berhasil dihapus!');
        setAgamaList((prevList: DATA_AGAMA[]) =>
          prevList.filter((item: DATA_AGAMA) => item.id !== id)
        );

        router.refresh();
        setIsDeleteData(true);
      }
    } catch (error) {
      console.log('Error deleting data: ', error);
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
      <Table data={agamaList} onDeleteData={handleDeleteAgama} />
    </>
  );
}
