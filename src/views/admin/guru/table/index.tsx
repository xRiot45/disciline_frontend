import TableLayout from '@/layouts/table-layout'
import BasicTableWidget from '@/components/controlled-table/basic-table-widget'
import { PiPlusBold } from 'react-icons/pi'
import { getColumns } from './columns'

type Data = {
  id: string
  nama_lengkap: string
  nip: string
  status: {
    nama_status: string
  }
  jabatan: {
    nama_jabatan: string
  }
  golongan: {
    nama_golongan: string
  }
  agama: {
    nama_agama: string
  }
  jenis_kelamin: string
  no_telp: string
  alamat: string
}

interface Proptypes {
  data: Data[]
  onDeleteData: (id: string) => void
}

const pageHeader = {
  title: 'Guru',
  breadcrumb: [
    {
      href: '/admin/dashboard',
      name: 'Dashboard',
    },
    {
      name: 'Guru',
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
        urlButton={'/admin/guru/tambah'}
        buttonText={'Tambah Guru'}
        icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
      >
        <BasicTableWidget
          title="Data Guru"
          variant="modern"
          data={data}
          // @ts-ignore
          getColumns={getColumns}
          onDelete={onDeleteData}
          enablePagination
          searchPlaceholder="Cari guru..."
          className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
        />
      </TableLayout>
    </>
  )
}
