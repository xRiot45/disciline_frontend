'use client';

import axios from 'axios';
import toast from 'react-hot-toast';
import Table from './table';
import { Title } from 'rizzui';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { DATA_TIPE_PELANGGARAN } from '@/types/master/tipe-pelanggaran/type';

export default function TipePelanggaranView() {
  const router = useRouter();
  const [cookies] = useCookies<string>(['accessToken']);
  const [tipePelanggaranList, setTipePelanggaranList] = useState<
    DATA_TIPE_PELANGGARAN[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteData, setIsDeleteData] = useState<boolean>(false);

  useEffect(() => {
    const fetchTipePelanggaranData = async () => {
      setIsLoading(true);
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const res = await axios.get(
          `${process.env.API_URL}/api/master/tipe-pelanggaran`,
          {
            headers,
          }
        );

        setTipePelanggaranList(res?.data?.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTipePelanggaranData();
  }, [cookies.accessToken]);

  const handleDeleteData = async (id: string) => {
    setIsLoading(true);
    try {
      const accessToken = cookies.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const res = await axios.delete(
        `${process.env.API_URL}/api/master/tipe-pelanggaran/${id}`,
        { headers }
      );
      if (res.status === 200) {
        toast.success('Tipe pelanggaran berhasil dihapus!');
        setTipePelanggaranList((prevList: DATA_TIPE_PELANGGARAN[]) =>
          prevList.filter((item: DATA_TIPE_PELANGGARAN) => item.id !== id)
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
      <Table data={tipePelanggaranList} onDeleteData={handleDeleteData} />
    </>
  );
}
