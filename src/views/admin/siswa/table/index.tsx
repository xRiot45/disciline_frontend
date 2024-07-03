import TableLayout from '@/layouts/table-layout'
import BasicTableWidget from '@/components/controlled-table/basic-table-widget'
import { PiPlusBold } from 'react-icons/pi'
import { getColumns } from './columns'

type Data = {
  id: string
  nama_lengkap: string
  nis: string
  nisn: string
  tanggal_lahir: string
  tempat_lahir: string
  jenis_kelamin: string
  kelas: {
    id: string
    nama_kelas: string
    jurusan: {
      id: string
      nama_jurusan: string
    }
    guru: {
      id: string
      nama_guru: string
      no_telp: string
    }
  }
  agama: {
    id: string
    nama_agama: string
  }
  nama_wali: string
  no_telp_wali: string
  alamat: string
}

interface Proptypes {
  data: Data[]
  onDeleteData: (id: string) => void
}

const pageHeader = {
  title: 'Siswa',
  breadcrumb: [
    {
      href: '/admin/dashboard',
      name: 'Dashboard',
    },
    {
      name: 'Siswa',
    },
  ],
}

export default function Table(props: Proptypes) {
  const { data, onDeleteData } = props
  return (
    <>
      <TableLayout
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        data={data}
        urlButton={'/admin/siswa/tambah'}
        buttonText={'Tambah Siswa'}
        icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
      >
        <BasicTableWidget
          title="Data Siswa"
          variant="modern"
          data={data}
          // @ts-ignore
          getColumns={getColumns}
          onDelete={onDeleteData}
          enablePagination
          searchPlaceholder="Cari siswa..."
          className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
        />
      </TableLayout>
    </>
  )
}
