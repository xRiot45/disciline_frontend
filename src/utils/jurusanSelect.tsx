'use client';

import axios from 'axios';
import { Select } from 'rizzui';
import { useCookies } from 'react-cookie';
import { DATA_JURUSAN } from '@/types/master/jurusan/type';
import { ValidationSchema } from '@/views/admin/kelas/form/validationSchema';
import { useEffect, useState } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

interface PropTypes {
  control: Control<ValidationSchema>;
  error: string | undefined | FieldErrors<ValidationSchema>;
}

export default function JurusanSelect(props: PropTypes) {
  const { control, error } = props;
  const [cookies] = useCookies<string>(['accessToken']);
  const [jurusanData, setJurusanData] = useState<DATA_JURUSAN[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const res = await axios.get(
          `${process.env.API_URL}/api/master/jurusan`,
          {
            headers,
          }
        );
        const transformedData = res?.data?.data.map((item: DATA_JURUSAN) => ({
          id: item.id,
          nama_jurusan: item.nama_jurusan,
        }));

        setJurusanData(transformedData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [cookies.accessToken]);

  const optionJurusan = jurusanData.map((item: DATA_JURUSAN) => ({
    value: item.id,
    label: item.nama_jurusan,
  }));

  const findSelectedOption = (value: string | null) => {
    return optionJurusan.find((option) => option.value === value) || null;
  };

  return (
    <>
      <Controller
        name="jurusanId"
        control={control}
        render={({ field: { onChange, value } }) => {
          const selectedOption = findSelectedOption(value);
          return (
            <Select
              size="lg"
              label="Jurusan"
              value={selectedOption || null}
              error={typeof error === 'string' ? error : undefined}
              placeholder="Pilih Jurusan..."
              dropdownClassName="!z-0"
              options={optionJurusan}
              onChange={onChange}
              getOptionValue={(option) => option.value}
            />
          );
        }}
      />
    </>
  );
}
