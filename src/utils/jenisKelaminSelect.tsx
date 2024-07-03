'use client';

import { Select } from 'rizzui';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { ValidationSchema } from '@/views/admin/siswa/form/validationSchema';

interface PropTypes {
  control: Control<ValidationSchema>;
  error: string | undefined | FieldErrors<ValidationSchema>;
}

export default function JenisKelaminSelect(props: PropTypes) {
  const { control, error } = props;

  const jenisKelaminOptions = [
    {
      value: 'Laki-laki',
      label: 'Laki-laki',
    },
    {
      value: 'Perempuan',
      label: 'Perempuan',
    },
  ];

  return (
    <>
      <Controller
        name="jenis_kelamin"
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <Select
              size="lg"
              label="Jenis Kelamin"
              value={value}
              error={typeof error === 'string' ? error : undefined}
              placeholder="Pilih Jenis Kelamin..."
              dropdownClassName="!z-0"
              options={jenisKelaminOptions}
              onChange={onChange}
              getOptionValue={(option) => option.value}
            />
          );
        }}
      />
    </>
  );
}
