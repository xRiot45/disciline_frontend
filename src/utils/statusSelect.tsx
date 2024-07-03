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
  nama_status: string
}

export default function StatusSelect(props: Proptypes) {
  const { control, error } = props
  const [cookies] = useCookies(['accessToken'])
  const [statusData, setStatusData] = useState([])
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
          `${process.env.API_URL}/api/master/status`,
          {
            headers,
          },
        )
        const transformedData = res?.data?.data.map((item: Item) => ({
          id: item.id,
          nama_status: item.nama_status,
        }))

        setStatusData(transformedData)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [cookies.accessToken])

  const optionStatus = statusData.map((item: any) => ({
    value: item.id,
    label: item.nama_status,
  }))

  const findSelectedOption = (value: string | null) => {
    return optionStatus.find((option) => option.value === value) || null
  }

  return (
    <>
      <Controller
        name="statusId"
        control={control}
        defaultValue={null}
        render={({ field: { onChange, value } }) => {
          const selectedOption = findSelectedOption(value)
          return (
            <Select
              size="lg"
              label="Status"
              value={selectedOption || null}
              error={error}
              placeholder="Pilih Status..."
              dropdownClassName="!z-0"
              options={optionStatus}
              onChange={onChange}
              getOptionValue={(option) => option.value}
            />
          )
        }}
      />
    </>
  )
}
