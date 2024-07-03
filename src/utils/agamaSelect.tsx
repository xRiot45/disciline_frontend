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
  nama_agama: string
}

export default function AgamaSelect(props: Proptypes) {
  const { control, error } = props
  const [cookies] = useCookies(['accessToken'])
  const [agamaData, setAgamaData] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      try {
        const accessToken = cookies.accessToken
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        }

        const res = await axios.get(`${process.env.API_URL}/api/master/agama`, {
          headers,
        })
        const transformedData = res?.data?.data.map((item: Item) => ({
          id: item.id,
          nama_agama: item.nama_agama,
        }))

        setAgamaData(transformedData)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [cookies.accessToken])

  const optionAgama = agamaData.map((item: any) => ({
    value: item.id,
    label: item.nama_agama,
  }))

  const findSelectedOption = (value: string | null) => {
    return optionAgama.find((option) => option.value === value) || null
  }

  return (
    <>
      <Controller
        name="agamaId"
        control={control}
        defaultValue={null}
        render={({ field: { onChange, value } }) => {
          const selectedOption = findSelectedOption(value)
          return (
            <Select
              size="lg"
              label="Agama"
              value={selectedOption || null}
              error={error}
              placeholder="Pilih Agama..."
              dropdownClassName="!z-0"
              options={optionAgama}
              onChange={onChange}
              getOptionValue={(option) => option.value}
            />
          )
        }}
      />
    </>
  )
}
