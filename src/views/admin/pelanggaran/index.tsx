'use client'

import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie'
import toast from 'react-hot-toast'
import { Title } from 'rizzui'
import Table from './table'

export default function PelanggaranView() {
  const router = useRouter()
  const [cookies] = useCookies(['accessToken'])
  const [pelanggaran, setPelanggaran] = useState([])
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
        const res = await axios.get(`${process.env.API_URL}/api/pelanggaran`, {
          headers,
        })

        setPelanggaran(res?.data?.data)
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
      <Table data={pelanggaran} />
    </>
  )
}
