'use client';

import axios from 'axios';
import { Select } from 'rizzui';
import { useCookies } from 'react-cookie';
import { ValidationSchema } from '@/views/admin/pelanggaran/form/validationSchema';
import { useEffect, useState } from 'react';
import { DATA_TIPE_PELANGGARAN } from '@/types/master/tipe-pelanggaran/type';
import { Control, Controller, FieldErrors } from 'react-hook-form';

interface PropTypes {
  control: Control<ValidationSchema>;
  error: string | undefined | FieldErrors<ValidationSchema>;
}

export default function TipePelanggaranSelect(props: PropTypes) {
  const { control, error } = props;
  const [cookies] = useCookies<string>(['accessToken']);
  const [tipePelanggaranData, setTipePelanggaranData] = useState<
    DATA_TIPE_PELANGGARAN[]
  >([]);
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
          `${process.env.API_URL}/api/master/tipe-pelanggaran`,
          {
            headers,
          }
        );
        const transformedData = res?.data?.data.map(
          (item: DATA_TIPE_PELANGGARAN) => ({
            id: item.id,
            nama_tipe_pelanggaran: item.nama_tipe_pelanggaran,
          })
        );

        setTipePelanggaranData(transformedData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [cookies.accessToken]);

  const optionTipePelanggaran = tipePelanggaranData.map(
    (item: DATA_TIPE_PELANGGARAN) => ({
      value: item.id,
      label: item.nama_tipe_pelanggaran,
    })
  );

  const findSelectedOption = (value: string | null) => {
    return (
      optionTipePelanggaran.find((option) => option.value === value) || null
    );
  };

  return (
    <>
      <Controller
        name="tipePelanggaranId"
        control={control}
        render={({ field: { onChange, value } }) => {
          const selectedOption = findSelectedOption(value);
          return (
            <Select
              size="lg"
              label="Tipe Pelanggaran"
              value={selectedOption || null}
              error={typeof error === 'string' ? error : undefined}
              placeholder="Pilih Tipe Pelanggaran..."
              dropdownClassName="!z-0"
              options={optionTipePelanggaran}
              onChange={onChange}
              getOptionValue={(option) => option.value}
            />
          );
        }}
      />
    </>
  );
}
