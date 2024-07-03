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
  nama_jabatan: string
}

export default function JabatanSelect(props: Proptypes) {
  const { control, error } = props
  const [cookies] = useCookies(['accessToken'])
  const [jabatanData, setJabatanData] = useState([])
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
          `${process.env.API_URL}/api/master/jabatan`,
          {
            headers,
          },
        )
        const transformedData = res?.data?.data.map((item: Item) => ({
          id: item.id,
          nama_jabatan: item.nama_jabatan,
        }))

        setJabatanData(transformedData)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [cookies.accessToken])

  const optionJabatan = jabatanData.map((item: any) => ({
    value: item.id,
    label: item.nama_jabatan,
  }))

  const findSelectedOption = (value: string | null) => {
    return optionJabatan.find((option) => option.value === value) || null
  }

  return (
    <>
      <Controller
        name="jabatanId"
        control={control}
        defaultValue={null}
        render={({ field: { onChange, value } }) => {
          const selectedOption = findSelectedOption(value)
          return (
            <Select
              size="lg"
              label="Jabatan"
              value={selectedOption || null}
              error={error}
              placeholder="Pilih Jabatan..."
              dropdownClassName="!z-0"
              options={optionJabatan}
              onChange={onChange}
              getOptionValue={(option) => option.value}
            />
          )
        }}
      />
    </>
  )
}
