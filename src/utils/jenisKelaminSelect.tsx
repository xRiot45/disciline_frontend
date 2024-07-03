'use client'

import { Select } from 'rizzui'
import { Controller } from 'react-hook-form'

interface Proptypes {
  control: any
  error: string | any
}

export default function JenisKelaminSelect(props: Proptypes) {
  const { control, error } = props

  const jenisKelaminOptions = [
    {
      value: 'Laki-laki',
      label: 'Laki-laki',
    },
    {
      value: 'Perempuan',
      label: 'Perempuan',
    },
  ]

  return (
    <>
      <Controller
        name="jenis_kelamin"
        control={control}
        defaultValue={null}
        render={({ field: { onChange, value } }) => {
          return (
            <Select
              size="lg"
              label="Jenis Kelamin"
              value={value}
              error={error}
              placeholder="Pilih Jenis Kelamin..."
              dropdownClassName="!z-0"
              options={jenisKelaminOptions}
              onChange={onChange}
              getOptionValue={(option) => option.value}
            />
          )
        }}
      />
    </>
  )
}
