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
  nama_tipe_pelanggaran: string
}

export default function TipePelanggaranSelect(props: Proptypes) {
  const { control, error } = props
  const [cookies] = useCookies(['accessToken'])
  const [tipePelanggaranData, setTipePelanggaranData] = useState([])
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
          `${process.env.API_URL}/api/master/tipe-pelanggaran`,
          {
            headers,
          },
        )
        const transformedData = res?.data?.data.map((item: Item) => ({
          id: item.id,
          nama_tipe_pelanggaran: item.nama_tipe_pelanggaran,
        }))

        setTipePelanggaranData(transformedData)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [cookies.accessToken])

  const optionTipePelanggaran = tipePelanggaranData.map((item: any) => ({
    value: item.id,
    label: item.nama_tipe_pelanggaran,
  }))

  const findSelectedOption = (value: string | null) => {
    return (
      optionTipePelanggaran.find((option) => option.value === value) || null
    )
  }

  return (
    <>
      <Controller
        name="tipePelanggaranId"
        control={control}
        defaultValue={null}
        render={({ field: { onChange, value } }) => {
          const selectedOption = findSelectedOption(value)
          return (
            <Select
              size="lg"
              label="Tipe Pelanggaran"
              value={selectedOption || null}
              error={error}
              placeholder="Pilih Tipe Pelanggaran..."
              dropdownClassName="!z-0"
              options={optionTipePelanggaran}
              onChange={onChange}
              getOptionValue={(option) => option.value}
            />
          )
        }}
      />
    </>
  )
}
