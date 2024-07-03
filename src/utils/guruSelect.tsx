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
  nama_lengkap: string
}

export default function GuruSelect(props: Proptypes) {
  const { control, error } = props
  const [cookies] = useCookies(['accessToken'])
  const [guruData, setGuruData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const accessToken = cookies.accessToken
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        }

        const res = await axios.get(`${process.env.API_URL}/api/guru`, {
          headers,
        })
        const transformedData = res?.data?.data.map((item: Item) => ({
          id: item.id,
          nama_lengkap: item.nama_lengkap,
        }))

        setGuruData(transformedData)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [cookies.accessToken])

  const optionGuru = guruData.map((item: any) => ({
    value: item.id,
    label: item.nama_lengkap,
  }))

  const findSelectedOption = (value: string | null) => {
    return optionGuru.find((option) => option.value === value) || null
  }

  return (
    <>
      <Controller
        name="guruId"
        control={control}
        defaultValue={null}
        render={({ field: { onChange, value } }) => {
          const selectedOption = findSelectedOption(value)
          return (
            <Select
              size="lg"
              label="Guru"
              value={selectedOption || null}
              error={error}
              placeholder="Pilih Guru..."
              dropdownClassName="!z-0"
              options={optionGuru}
              onChange={onChange}
              getOptionValue={(option) => option.value}
            />
          )
        }}
      />
    </>
  )
}
