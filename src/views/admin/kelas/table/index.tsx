import TableLayout from '@/layouts/table-layout'
import BasicTableWidget from '@/components/controlled-table/basic-table-widget'
import { PiPlusBold } from 'react-icons/pi'
import { getColumns } from './columns'

type Data = {
  id: string
  nama_lengkap: string
  nip: string
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

interface Proptypes {
  data: Data[]
  onDeleteData: (id: string) => void
}

const pageHeader = {
  title: 'Kelas',
  breadcrumb: [
    {
      href: '/admin/dashboard',
      name: 'Dashboard',
    },
    {
      name: 'Kelas',
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
        urlButton={'/admin/kelas/tambah'}
        buttonText={'Tambah Kelas'}
        icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
      >
        <BasicTableWidget
          title="Data Kelas"
          variant="modern"
          data={data}
          // @ts-ignore
          getColumns={getColumns}
          onDelete={onDeleteData}
          enablePagination
          searchPlaceholder="Cari kelas..."
          className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
        />
      </TableLayout>
    </>
  )
}
