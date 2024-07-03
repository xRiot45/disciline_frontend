'use client';

import axios from 'axios';
import { Select } from 'rizzui';
import { useCookies } from 'react-cookie';
import { DATA_STATUS } from '@/types/master/status/type';
import { ValidationSchema } from '@/views/admin/guru/form/validationSchema';
import { useEffect, useState } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';

interface PropTypes {
  control: Control<ValidationSchema>;
  error: string | undefined | FieldErrors<ValidationSchema>;
}

export default function StatusSelect(props: PropTypes) {
  const { control, error } = props;
  const [cookies] = useCookies<string>(['accessToken']);
  const [statusData, setStatusData] = useState<DATA_STATUS[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchStatusData = async () => {
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const res = await axios.get(
          `${process.env.API_URL}/api/master/status`,
          {
            headers,
          }
        );
        const transformedData = res?.data?.data.map((item: DATA_STATUS) => ({
          id: item.id,
          nama_status: item.nama_status,
        }));

        setStatusData(transformedData);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStatusData();
  }, [cookies.accessToken]);

  const optionStatus = statusData.map((item: DATA_STATUS) => ({
    value: item.id,
    label: item.nama_status,
  }));

  const findSelectedOption = (value: string | null) => {
    return optionStatus.find((option) => option.value === value) || null;
  };

  return (
    <>
      <Controller
        name="statusId"
        control={control}
        render={({ field: { onChange, value } }) => {
          const selectedOption = findSelectedOption(value);
          return (
            <Select
              size="lg"
              label="Status"
              value={selectedOption || null}
              error={typeof error === 'string' ? error : undefined}
              placeholder="Pilih Status..."
              dropdownClassName="!z-0"
              options={optionStatus}
              onChange={onChange}
              getOptionValue={(option) => option.value}
            />
          );
        }}
      />
    </>
  );
}
