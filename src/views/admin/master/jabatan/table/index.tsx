import TableLayout from '@/layouts/table-layout';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import { PiPlusBold } from 'react-icons/pi';
import { getColumns } from './columns';
import { DATA_JABATAN } from '@/types/master/jabatan/type';

interface Proptypes {
  data: DATA_JABATAN[];
  onDeleteData: (id: string) => void;
}

const pageHeader = {
  title: 'Jabatan',
  breadcrumb: [
    {
      href: '/admin/dashboard',
      name: 'Dashboard',
    },
    {
      name: 'Jabatan',
    },
  ],
};

export default function Table(props: Proptypes) {
  const { data, onDeleteData } = props;
  return (
    <>
      <TableLayout
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        data={data}
        urlButton={'/admin/master/jabatan/tambah'}
        buttonText={'Tambah Jabatan'}
        iconText={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
      >
        <BasicTableWidget
          title="Data Jabatan"
          variant="modern"
          data={data}
          // @ts-ignore
          getColumns={getColumns}
          onDelete={onDeleteData}
          enablePagination
          searchPlaceholder="Cari jabatan..."
          className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
        />
      </TableLayout>
    </>
  );
}
