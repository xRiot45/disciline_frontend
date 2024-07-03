import TableLayout from '@/layouts/table-layout';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import { getColumns } from './columns';
import { PiPlusBold } from 'react-icons/pi';
import { DATA_SISWA } from '@/types/siswa/type';

interface Proptypes {
  data: DATA_SISWA[];
  onDeleteData: (id: string) => void;
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
};

export default function Table(props: Proptypes) {
  const { data, onDeleteData } = props;
  return (
    <>
      <TableLayout
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        data={data}
        urlButton={'/admin/siswa/tambah'}
        buttonText={'Tambah Siswa'}
        iconText={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
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
  );
}
