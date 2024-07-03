'use client';

import axios from 'axios';
import { Select } from 'rizzui';
import { useCookies } from 'react-cookie';
import { DATA_GOLONGAN } from '@/types/master/golongan/type';
import { ValidationSchema } from '@/views/admin/guru/form/validationSchema';
import { useEffect, useState } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

interface PropTypes {
  control: Control<ValidationSchema>;
  error: string | undefined | FieldErrors<ValidationSchema>;
}

export default function GolonganSelect(props: PropTypes) {
  const { control, error } = props;
  const [cookies] = useCookies<string>(['accessToken']);
  const [golonganData, setGolonganData] = useState<DATA_GOLONGAN[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchGolonganData = async () => {
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const res = await axios.get(
          `${process.env.API_URL}/api/master/golongan`,
          {
            headers,
          }
        );
        const transformedData = res?.data?.data.map((item: DATA_GOLONGAN) => ({
          id: item.id,
          nama_golongan: item.nama_golongan,
        }));

        setGolonganData(transformedData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGolonganData();
  }, [cookies.accessToken]);

  const optionGolongan = golonganData.map((item: DATA_GOLONGAN) => ({
    value: item.id,
    label: item.nama_golongan,
  }));

  const findSelectedOption = (value: string | null) => {
    return optionGolongan.find((option) => option.value === value) || null;
  };

  return (
    <>
      <Controller
        name="golonganId"
        control={control}
        render={({ field: { onChange, value } }) => {
          const selectedOption = findSelectedOption(value);
          return (
            <Select
              size="lg"
              label="Golongan"
              value={selectedOption || null}
              error={typeof error === 'string' ? error : undefined}
              placeholder="Pilih Golongan..."
              dropdownClassName="!z-0"
              options={optionGolongan}
              onChange={onChange}
              getOptionValue={(option) => option.value}
            />
          );
        }}
      />
    </>
  );
}
