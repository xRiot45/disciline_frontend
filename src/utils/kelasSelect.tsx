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
  nama_kelas: string
}

export default function KelasSelect(props: Proptypes) {
  const { control, error } = props
  const [cookies] = useCookies(['accessToken'])
  const [kelasData, setKelasData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const accessToken = cookies.accessToken
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        }

        const res = await axios.get(`${process.env.API_URL}/api/kelas`, {
          headers,
        })
        const transformedData = res?.data?.data.map((item: Item) => ({
          id: item.id,
          nama_kelas: item.nama_kelas,
        }))

        setKelasData(transformedData)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [cookies.accessToken])

  const optionKelas = kelasData.map((item: any) => ({
    value: item.id,
    label: item.nama_kelas,
  }))

  const findSelectedOption = (value: string | null) => {
    return optionKelas.find((option) => option.value === value) || null
  }

  return (
    <>
      <Controller
        name="kelasId"
        control={control}
        defaultValue={null}
        render={({ field: { onChange, value } }) => {
          const selectedOption = findSelectedOption(value)
          return (
            <Select
              size="lg"
              label="Kelas"
              value={selectedOption || null}
              error={error}
              placeholder="Pilih Kelas..."
              dropdownClassName="!z-0"
              options={optionKelas}
              onChange={onChange}
              getOptionValue={(option) => option.value}
            />
          )
        }}
      />
    </>
  )
}
