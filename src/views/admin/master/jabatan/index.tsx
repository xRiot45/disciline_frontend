'use client';

import axios from 'axios';
import toast from 'react-hot-toast';
import Table from './table';
import { Title } from 'rizzui';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { DATA_JABATAN } from '@/types/master/jabatan/type';
import { useEffect, useState } from 'react';

export default function JabatanView() {
  const router = useRouter();
  const [cookies] = useCookies<string>(['accessToken']);
  const [jabatanList, setJabatanList] = useState<DATA_JABATAN[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteData, setIsDeleteData] = useState<boolean>(false);

  useEffect(() => {
    const fetchJabatanData = async () => {
      setIsLoading(true);
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const res = await axios.get(
          `${process.env.API_URL}/api/master/jabatan`,
          {
            headers,
          }
        );

        setJabatanList(res?.data?.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching jabatan data: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJabatanData();
  }, [cookies.accessToken]);

  const handleDeleteJabatan = async (id: string) => {
    setIsLoading(true);
    try {
      const accessToken = cookies.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const res = await axios.delete(
        `${process.env.API_URL}/api/master/jabatan/${id}`,
        { headers }
      );
      if (res.status === 200) {
        toast.success('Jabatan berhasil dihapus!');
        setJabatanList((prevList: DATA_JABATAN[]) =>
          prevList.filter((item: DATA_JABATAN) => item.id !== id)
        );

        router.refresh();
        setIsDeleteData(true);
      }
    } catch (error: any) {
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
      <Table data={jabatanList} onDeleteData={handleDeleteJabatan} />
    </>
  );
}
