'use client'

import axios from 'axios'
import { Select } from 'rizzui'
import { Controller } from 'react-hook-form'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'

interface Proptypes {
  control: any
  error: any
}

type Item = {
  id: string
  nama_jurusan: string
}

export default function JurusanSelect(props: Proptypes) {
  const { control, error } = props
  const [cookies] = useCookies(['accessToken'])
  const [jurusanData, setJurusanData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const accessToken = cookies.accessToken
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        }

        const res = await axios.get(
          `${process.env.API_URL}/api/master/jurusan`,
          {
            headers,
          },
        )
        const transformedData = res?.data?.data.map((item: Item) => ({
          id: item.id,
          nama_jurusan: item.nama_jurusan,
        }))

        setJurusanData(transformedData)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [cookies.accessToken])

  const optionJurusan = jurusanData.map((item: any) => ({
    value: item.id,
    label: item.nama_jurusan,
  }))

  const findSelectedOption = (value: string | null) => {
    return optionJurusan.find((option) => option.value === value) || null
  }

  return (
    <>
      <Controller
        name="jurusanId"
        control={control}
        defaultValue={null}
        render={({ field: { onChange, value } }) => {
          const selectedOption = findSelectedOption(value)
          return (
            <Select
              size="lg"
              label="Jurusan"
              value={selectedOption || null}
              error={error}
              placeholder="Pilih Jurusan..."
              dropdownClassName="!z-0"
              options={optionJurusan}
              onChange={onChange}
              getOptionValue={(option) => option.value}
            />
          )
        }}
      />
    </>
  )
}
