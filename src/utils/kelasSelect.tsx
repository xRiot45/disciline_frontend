'use client';

import axios from 'axios';
import { Select } from 'rizzui';
import { useCookies } from 'react-cookie';
import { DATA_KELAS } from '@/types/kelas/type';
import { ValidationSchema } from '@/views/admin/siswa/form/validationSchema';
import { useEffect, useState } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

interface PropTypes {
  control: Control<ValidationSchema>;
  error: string | undefined | FieldErrors<ValidationSchema>;
}

export default function KelasSelect(props: PropTypes) {
  const { control, error } = props;
  const [cookies] = useCookies(['accessToken']);
  const [kelasData, setKelasData] = useState<DATA_KELAS[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchKelasData = async () => {
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const res = await axios.get(`${process.env.API_URL}/api/kelas`, {
          headers,
        });
        const transformedData = res?.data?.data.map((item: DATA_KELAS) => ({
          id: item.id,
          nama_kelas: item.nama_kelas,
        }));

        setKelasData(transformedData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchKelasData();
  }, [cookies.accessToken]);

  const optionKelas = kelasData.map((item: DATA_KELAS) => ({
    value: item.id,
    label: item.nama_kelas,
  }));

  const findSelectedOption = (value: string | null) => {
    return optionKelas.find((option) => option.value === value) || null;
  };

  return (
    <>
      <Controller
        name="kelasId"
        control={control}
        render={({ field: { onChange, value } }) => {
          const selectedOption = findSelectedOption(value);
          return (
            <Select
              size="lg"
              label="Kelas"
              value={selectedOption || null}
              error={typeof error === 'string' ? error : undefined}
              placeholder="Pilih Kelas..."
              dropdownClassName="!z-0"
              options={optionKelas}
              onChange={onChange}
              getOptionValue={(option) => option.value}
            />
          );
        }}
      />
    </>
  );
}
