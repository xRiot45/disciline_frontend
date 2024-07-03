'use client';

import axios from 'axios';
import { Select } from 'rizzui';
import { useCookies } from 'react-cookie';
import { DATA_JABATAN } from '@/types/master/jabatan/type';
import { ValidationSchema } from '@/views/admin/guru/form/validationSchema';
import { useEffect, useState } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

interface PropTypes {
  control: Control<ValidationSchema>;
  error: string | undefined | FieldErrors<ValidationSchema>;
}

export default function JabatanSelect(props: PropTypes) {
  const { control, error } = props;
  const [cookies] = useCookies(['accessToken']);
  const [jabatanData, setJabatanData] = useState<DATA_JABATAN[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchJabatanData = async () => {
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const res = await axios.get(
          `${process.env.API_URL}/api/master/jabatan`,
          {
            headers,
          }
        );
        const transformedData = res?.data?.data.map((item: DATA_JABATAN) => ({
          id: item.id,
          nama_jabatan: item.nama_jabatan,
        }));

        setJabatanData(transformedData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJabatanData();
  }, [cookies.accessToken]);

  const optionJabatan = jabatanData.map((item: DATA_JABATAN) => ({
    value: item.id,
    label: item.nama_jabatan,
  }));

  const findSelectedOption = (value: string | null) => {
    return optionJabatan.find((option) => option.value === value) || null;
  };

  return (
    <>
      <Controller
        name="jabatanId"
        control={control}
        render={({ field: { onChange, value } }) => {
          const selectedOption = findSelectedOption(value);
          return (
            <Select
              size="lg"
              label="Jabatan"
              value={selectedOption || null}
              error={
                typeof error === 'string' ? error : error?.jabatanId?.message
              }
              placeholder="Pilih Jabatan..."
              dropdownClassName="!z-0"
              options={optionJabatan}
              onChange={onChange}
              getOptionValue={(option) => option.value}
            />
          );
        }}
      />
    </>
  );
}
