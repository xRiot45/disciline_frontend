'use client';

import axios from 'axios';
import cn from '@/utils/class-names';
import MetricCard from '@/components/cards/metric-card';
import PageHeader from '@/shared/page-header';
import { SlNote } from 'react-icons/sl';
import { DATA_GURU } from '@/types/guru/type';
import { DATA_KELAS } from '@/types/kelas/type';
import { DATA_SISWA } from '@/types/siswa/type';
import { useCookies } from 'react-cookie';
import { PiStudentFill } from 'react-icons/pi';
import { DATA_PELANGGARAN } from '@/types/pelanggaran/type';
import { SiGoogleclassroom } from 'react-icons/si';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { useEffect, useState } from 'react';

interface DataList<T> {
  data: T[];
}

const pageHeader = {
  title: 'Dashboard',
  breadcrumb: [
    {
      name: 'Dashboard Admin',
    },
  ],
};

const fetchData = async <T,>(url: string, headers: object) => {
  try {
    const res = await axios.get<DataList<T>>(url, { headers });
    return res?.data?.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export default function DashboardView() {
  const [cookies] = useCookies<string>(['accessToken']);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [guruList, setGuruList] = useState<DATA_GURU[]>([]);
  const [kelasList, setKelasList] = useState<DATA_KELAS[]>([]);
  const [siswaList, setSiswaList] = useState<DATA_SISWA[]>([]);
  const [pelanggaranList, setPelanggaranList] = useState<DATA_PELANGGARAN[]>(
    []
  );

  useEffect(() => {
    const fetchDataAsync = async () => {
      setIsLoading(true);
      const accessToken = cookies.accessToken;
      const headers = { Authorization: `Bearer ${accessToken}` };

      const [guruData, kelasData, siswaData, pelanggaranData] =
        await Promise.all([
          fetchData<DATA_GURU>(`${process.env.API_URL}/api/guru`, headers),
          fetchData<DATA_KELAS>(`${process.env.API_URL}/api/kelas`, headers),
          fetchData<DATA_SISWA>(`${process.env.API_URL}/api/siswa`, headers),
          fetchData<DATA_PELANGGARAN>(
            `${process.env.API_URL}/api/pelanggaran`,
            headers
          ),
        ]);

      setGuruList(guruData);
      setKelasList(kelasData);
      setSiswaList(siswaData);
      setPelanggaranList(pelanggaranData);

      setIsLoading(false);
    };

    fetchDataAsync();
  }, [cookies.accessToken]);

  const totalGuru = guruList.length;

  const data = [
    {
      id: 1,
      icon: <FaChalkboardTeacher className="h-full w-full" />,
      title: 'Total Data Guru',
      metric: totalGuru.toString(),
    },
    {
      id: 2,
      icon: <SiGoogleclassroom className="h-full w-full" />,
      title: 'Total Data Kelas',
      metric: kelasList.length.toString(),
    },
    {
      id: 3,
      icon: <PiStudentFill className="h-full w-full" />,
      title: 'Total Data Siswa',
      metric: siswaList.length.toString(),
    },
    {
      id: 4,
      icon: <SlNote className="h-full w-full" />,
      title: 'Total Data Pelanggaran',
      metric: pelanggaranList.length.toString(),
    },
  ];

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className={cn('grid gap-5 md:grid-cols-2 lg:grid-cols-4')}>
        {data.map((item) => (
          <MetricCard
            key={item.id}
            icon={item.icon}
            title={item.title}
            metric={item.metric}
          />
        ))}
      </div>
    </>
  );
}
