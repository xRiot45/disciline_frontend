'use client'

import axios from 'axios'
import toast from 'react-hot-toast'
import Table from './table'
import { Title } from 'rizzui'
import { useRouter } from 'next/navigation'
import { useCookies } from 'react-cookie'
import { useEffect, useState } from 'react'

export default function TipePelanggaranView() {
  const router = useRouter()
  const [cookies] = useCookies(['accessToken'])
  const [tipePelanggaran, setTipePelanggaran] = useState([])
  const [loading, setLoading] = useState(false)
  const [deleteData, setDeleteData] = useState(false)

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
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

        setTipePelanggaran(res?.data?.data)
        setLoading(false)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [cookies.accessToken])

  // Delete data
  const handleDeleteData = async (id: string) => {
    setLoading(true)
    try {
      const accessToken = cookies.accessToken
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      }

      const res = await axios.delete(
        `${process.env.API_URL}/api/master/tipe-pelanggaran/${id}`,
        { headers },
      )
      if (res.status === 200) {
        toast.success('Tipe pelanggaran berhasil dihapus!')
        setTipePelanggaran((prevData: any) =>
          prevData.filter((item: any) => item.id !== id),
        )

        router.refresh()
        setDeleteData(true)
      }
    } catch (error: any) {
      console.log(error)
      toast.error('Terjadi kesalahan saat menghapus data, silahkan coba lagi!')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="mx-auto flex justify-center ">
        <Title as="h6" className="-me-2 mt-4 font-medium text-gray-500">
          Loading...
        </Title>
      </div>
    )
  }

  return (
    <>
      <Table data={tipePelanggaran} onDeleteData={handleDeleteData} />
    </>
  )
}
