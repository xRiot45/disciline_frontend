'use client';

import axios from 'axios';
import { Select } from 'rizzui';
import { useCookies } from 'react-cookie';
import { DATA_GURU } from '@/types/guru/type';
import { useEffect, useState } from 'react';
import { ValidationSchema } from '@/views/admin/kelas/form/validationSchema';
import { Control, Controller, FieldErrors } from 'react-hook-form';

interface PropTypes {
  control: Control<ValidationSchema>;
  error: string | undefined | FieldErrors<ValidationSchema>;
}

export default function GuruSelect(props: PropTypes) {
  const { control, error } = props;
  const [cookies] = useCookies<string>(['accessToken']);
  const [guruData, setGuruData] = useState<DATA_GURU[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchGuruData = async () => {
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const res = await axios.get(`${process.env.API_URL}/api/guru`, {
          headers,
        });
        const transformedData = res?.data?.data.map((item: DATA_GURU) => ({
          id: item.id,
          nama_lengkap: item.nama_lengkap,
        }));

        setGuruData(transformedData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGuruData();
  }, [cookies.accessToken]);

  const optionGuru = guruData.map((item: DATA_GURU) => ({
    value: item.id,
    label: item.nama_lengkap,
  }));

  const findSelectedOption = (value: string | null) => {
    return optionGuru.find((option) => option.value === value) || null;
  };

  return (
    <>
      <Controller
        name="guruId"
        control={control}
        render={({ field: { onChange, value } }) => {
          const selectedOption = findSelectedOption(value);
          return (
            <Select
              size="lg"
              label="Guru"
              value={selectedOption || null}
              error={typeof error === 'string' ? error : undefined}
              placeholder="Pilih Guru..."
              dropdownClassName="!z-0"
              options={optionGuru}
              onChange={onChange}
              getOptionValue={(option) => option.value}
            />
          );
        }}
      />
    </>
  );
}
