'use client';

import axios from 'axios';
import Table from './table';
import toast from 'react-hot-toast';
import { Title } from 'rizzui';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { DATA_STATUS } from '@/types/master/status/type';
import { useEffect, useState } from 'react';

export default function StatusView() {
  const router = useRouter();
  const [cookies] = useCookies<string>(['accessToken']);
  const [statusList, setStatusList] = useState<DATA_STATUS[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDeleteData, setIsDeleteData] = useState<boolean>(false);

  useEffect(() => {
    const fetchStatusData = async () => {
      setIsLoading(true);
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const res = await axios.get(
          `${process.env.API_URL}/api/master/status`,
          {
            headers,
          }
        );

        setStatusList(res?.data?.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching status data: ', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatusData();
  }, [cookies.accessToken]);

  const handleDeleteStatus = async (id: string) => {
    setIsLoading(true);
    try {
      const accessToken = cookies.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const res = await axios.delete(
        `${process.env.API_URL}/api/master/status/${id}`,
        { headers }
      );
      if (res.status === 200) {
        toast.success('Status berhasil dihapus!');
        setStatusList((prevList: DATA_STATUS[]) =>
          prevList.filter((item: DATA_STATUS) => item.id !== id)
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
      <Table data={statusList} onDeleteData={handleDeleteStatus} />
    </>
  );
}
