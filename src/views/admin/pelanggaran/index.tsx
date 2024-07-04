'use client';

import * as XLSX from 'xlsx';
import axios from 'axios';
import Table from './table';
import FormatTanggal from '@/helpers/formatTanggal';
import { Title } from 'rizzui';
import { saveAs } from 'file-saver';
import { useCookies } from 'react-cookie';
import { DATA_PELANGGARAN } from '@/types/pelanggaran/type';
import { useEffect, useState } from 'react';

export default function PelanggaranView() {
  const [cookies] = useCookies(['accessToken']);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pelanggaranList, setPelanggaranList] = useState<DATA_PELANGGARAN[]>(
    []
  );

  useEffect(() => {
    const fetchPelanggaranData = async () => {
      setIsLoading(true);
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };
        const res = await axios.get(`${process.env.API_URL}/api/pelanggaran`, {
          headers,
        });

        setPelanggaranList(res?.data?.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPelanggaranData();
  }, [cookies.accessToken]);

  const dataPelanggaranSiswa = (data: DATA_PELANGGARAN[]) => {
    return data.map((item: DATA_PELANGGARAN) => ({
      nama_tipe_pelanggaran: item.tipe_pelanggaran?.nama_tipe_pelanggaran,
      nama_siswa: item.siswa?.nama_lengkap,
      nama_kelas: item.siswa?.kelas?.nama_kelas,
      nama_wali: item.siswa?.nama_wali,
      no_telp_wali: item.siswa?.no_telp_wali,
      alamat: item.siswa?.alamat,
      keterangan: item.keterangan,
    }));
  };

  const exportDataPelanggaranToExcel = () => {
    const dataPelanggaran = dataPelanggaranSiswa(pelanggaranList);
    const header = [
      [
        'Pelanggaran Yang Dilakukan',
        'Nama Lengkap Siswa',
        'Kelas',
        'Nama Wali Kelas',
        'No Telp Wali',
        'Alamat Siswa',
        'Keterangan',
      ],
    ];

    const ws = XLSX.utils.aoa_to_sheet(header);
    XLSX.utils.sheet_add_json(ws, dataPelanggaran, {
      origin: 'A2',
      skipHeader: true,
    });

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Data Pelanggaran');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(
      blob,
      `Data Pelanggaran Siswa ${FormatTanggal(new Date().toISOString())}.xlsx`
    );
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
      <Table
        data={pelanggaranList}
        handleExport={exportDataPelanggaranToExcel}
      />
    </>
  );
}
