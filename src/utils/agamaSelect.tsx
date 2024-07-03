'use client';

import axios from 'axios';
import { Select } from 'rizzui';
import { useCookies } from 'react-cookie';
import { DATA_AGAMA } from '@/types/master/agama/type';
import { ValidationSchema as GuruValidationSchema } from '@/views/admin/guru/form/validationSchema';
import { ValidationSchema as SiswaValidationSchema } from '@/views/admin/siswa/form/validationSchema';
import { useEffect, useState } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

interface PropTypes {
  control:
    | Control<GuruValidationSchema>
    | Control<SiswaValidationSchema>
    | undefined
    | any;
  error:
    | string
    | undefined
    | FieldErrors<GuruValidationSchema>
    | FieldErrors<SiswaValidationSchema>;
}

export default function AgamaSelect(props: PropTypes) {
  const { control, error } = props;
  const [cookies] = useCookies<string>(['accessToken']);
  const [agamaData, setAgamaData] = useState<DATA_AGAMA[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchAgamaData = async () => {
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const res = await axios.get(`${process.env.API_URL}/api/master/agama`, {
          headers,
        });
        const transformedData = res?.data?.data.map((item: DATA_AGAMA) => ({
          id: item.id,
          nama_agama: item.nama_agama,
        }));

        setAgamaData(transformedData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAgamaData();
  }, [cookies.accessToken]);

  const optionAgama = agamaData.map((item: DATA_AGAMA) => ({
    value: item.id,
    label: item.nama_agama,
  }));

  const findSelectedOption = (value: string | null) => {
    return optionAgama.find((option) => option.value === value) || null;
  };

  return (
    <>
      <Controller
        name="agamaId"
        control={control}
        render={({ field: { onChange, value } }) => {
          const selectedOption = findSelectedOption(value);
          return (
            <Select
              size="lg"
              label="Agama"
              value={selectedOption || null}
              error={typeof error === 'string' ? error : undefined}
              placeholder="Pilih Agama..."
              dropdownClassName="!z-0"
              options={optionAgama}
              onChange={onChange}
              getOptionValue={(option) => option.value}
            />
          );
        }}
      />
    </>
  );
}
