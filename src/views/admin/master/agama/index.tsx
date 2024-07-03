'use client';

import axios from 'axios';
import Table from './table';
import toast from 'react-hot-toast';
import { Data } from '@/types/master/agama/type';
import { Title } from 'rizzui';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';

export default function AgamaView() {
  const router = useRouter();
  const [cookies] = useCookies<string>(['accessToken']);
  const [agama, setAgama] = useState<Data[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [deleteData, setDeleteData] = useState<boolean>(false);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const res = await axios.get(`${process.env.API_URL}/api/master/agama`, {
          headers,
        });

        setAgama(res?.data?.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [cookies.accessToken]);

  // Delete data
  const handleDeleteData = async (id: string) => {
    setLoading(true);
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
        setAgama((prevData: Data[]) =>
          prevData.filter((item: Data) => item.id !== id)
        );

        router.refresh();
        setDeleteData(true);
      }
    } catch (error) {
      console.log(error);
      toast.error('Terjadi kesalahan saat menghapus data, silahkan coba lagi!');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
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
      <Table data={agama} onDeleteData={handleDeleteData} />
    </>
  );
}
