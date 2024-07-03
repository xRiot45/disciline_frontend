'use client';

import axios from 'axios';
import { Select } from 'rizzui';
import { useCookies } from 'react-cookie';
import { DATA_SISWA } from '@/types/siswa/type';
import { ValidationSchema } from '@/views/admin/pelanggaran/form/validationSchema';
import { useEffect, useState } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

interface PropTypes {
  control: Control<ValidationSchema>;
  error: string | undefined | FieldErrors<ValidationSchema>;
}

export default function SiswaSelect(props: PropTypes) {
  const { control, error } = props;
  const [cookies] = useCookies<string>(['accessToken']);
  const [siswaData, setSiswaData] = useState<DATA_SISWA[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchSiswaData = async () => {
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const res = await axios.get(`${process.env.API_URL}/api/siswa`, {
          headers,
        });
        const transformedData = res?.data?.data.map((item: DATA_SISWA) => ({
          id: item.id,
          nama_lengkap: item.nama_lengkap,
        }));

        setSiswaData(transformedData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSiswaData();
  }, [cookies.accessToken]);

  const optionSiswa = siswaData.map((item: DATA_SISWA) => ({
    value: item.id,
    label: item.nama_lengkap,
  }));

  const findSelectedOption = (value: string | null) => {
    return optionSiswa.find((option) => option.value === value) || null;
  };

  return (
    <>
      <Controller
        name="siswaId"
        control={control}
        render={({ field: { onChange, value } }) => {
          const selectedOption = findSelectedOption(value);
          return (
            <Select
              size="lg"
              label="Siswa"
              value={selectedOption || null}
              error={typeof error === 'string' ? error : undefined}
              placeholder="Pilih Siswa..."
              dropdownClassName="!z-0"
              options={optionSiswa}
              onChange={onChange}
              getOptionValue={(option) => option.value}
            />
          );
        }}
      />
    </>
  );
}
