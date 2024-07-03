import TableLayout from '@/layouts/table-layout'
import BasicTableWidget from '@/components/controlled-table/basic-table-widget'
import { PiPlusBold } from 'react-icons/pi'
import { getColumns } from './columns'

type Data = {
  id: string
  nama_golongan: string
}

interface Proptypes {
  data: Data[]
  onDeleteData: (id: string) => void
}

const pageHeader = {
  title: 'Golongan',
  breadcrumb: [
    {
      href: '/admin/dashboard',
      name: 'Dashboard',
    },
    {
      name: 'Golongan',
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
        urlButton={'/admin/master/golongan/tambah'}
        buttonText={'Tambah Golongan'}
        icon={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
      >
        <BasicTableWidget
          title="Data Golongan"
          variant="modern"
          data={data}
          // @ts-ignore
          getColumns={getColumns}
          onDelete={onDeleteData}
          enablePagination
          searchPlaceholder="Cari golongan..."
          className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
        />
      </TableLayout>
    </>
  )
}
