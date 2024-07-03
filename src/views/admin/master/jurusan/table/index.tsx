import TableLayout from '@/layouts/table-layout';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import { PiPlusBold } from 'react-icons/pi';
import { getColumns } from './columns';
import { DATA_JURUSAN } from '@/types/master/jurusan/type';

interface PropTypes {
  data: DATA_JURUSAN[];
  onDeleteData: (id: string) => void;
}

const pageHeader = {
  title: 'Jurusan',
  breadcrumb: [
    {
      href: '/admin/dashboard',
      name: 'Dashboard',
    },
    {
      name: 'Jurusan',
    },
  ],
};

export default function Table(props: PropTypes) {
  const { data, onDeleteData } = props;
  return (
    <>
      <TableLayout
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        data={data}
        urlButton={'/admin/master/jurusan/tambah'}
        buttonText={'Tambah Jurusan'}
        iconText={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
      >
        <BasicTableWidget
          title="Data Jurusan"
          variant="modern"
          data={data}
          // @ts-ignore
          getColumns={getColumns}
          onDelete={onDeleteData}
          enablePagination
          searchPlaceholder="Cari jurusan..."
          className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
        />
      </TableLayout>
    </>
  );
}
