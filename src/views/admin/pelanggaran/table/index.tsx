import TableLayout from '@/layouts/table-layout'
import BasicTableWidget from '@/components/controlled-table/basic-table-widget'
import { PiPlusBold } from 'react-icons/pi'
import { getColumns } from './columns'

type Data = {
  id: string
  tipe_pelanggaran: {
    id: string
    nama_tipe_pelanggaran: string
  }
  siswa: {
    id: string
    nama_lengkap: string
    kelas: {
      nama_kelas: string
    }

    nama_wali: string
    no_telp_wali: string
    alamat: string
  }
  keterangan: string
}

interface Proptypes {
  data: Data[]
  //   onDeleteData?: (id: string) => void
}

const pageHeader = {
  title: 'Pelanggaran Siswa',
  breadcrumb: [
    {
      href: '/admin/dashboard',
      name: 'Dashboard',
    },
    {
      name: 'Pelanggaran Siswa',
    },
  ],
}

export default function Table(props: Proptypes) {
  const { data } = props
  return (
    <>
      <TableLayout
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        data={data}
        urlButton={'/admin/pelanggaran/tambah'}
        buttonText={'Tambah Pelanggaran'}
        icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
      >
        <BasicTableWidget
          title="Data Pelanggaran Siswa"
          variant="modern"
          data={data}
          // @ts-ignore
          getColumns={getColumns}
          enablePagination
          searchPlaceholder="Cari siswa..."
          className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
        />
      </TableLayout>
    </>
  )
}
