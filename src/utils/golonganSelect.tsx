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
  nama_golongan: string
}

export default function GolonganSelect(props: Proptypes) {
  const { control, error } = props
  const [cookies] = useCookies(['accessToken'])
  const [golonganData, setGolonganData] = useState([])
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
          `${process.env.API_URL}/api/master/golongan`,
          {
            headers,
          },
        )
        const transformedData = res?.data?.data.map((item: Item) => ({
          id: item.id,
          nama_golongan: item.nama_golongan,
        }))

        setGolonganData(transformedData)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [cookies.accessToken])

  const optionGolongan = golonganData.map((item: any) => ({
    value: item.id,
    label: item.nama_golongan,
  }))

  const findSelectedOption = (value: string | null) => {
    return optionGolongan.find((option) => option.value === value) || null
  }

  return (
    <>
      <Controller
        name="golonganId"
        control={control}
        defaultValue={null}
        render={({ field: { onChange, value } }) => {
          const selectedOption = findSelectedOption(value)
          return (
            <Select
              size="lg"
              label="Golongan"
              value={selectedOption || null}
              error={error}
              placeholder="Pilih Golongan..."
              dropdownClassName="!z-0"
              options={optionGolongan}
              onChange={onChange}
              getOptionValue={(option) => option.value}
            />
          )
        }}
      />
    </>
  )
}
