import TableLayout from '@/layouts/table-layout';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import { DATA_GURU } from '@/types/guru/type';
import { PiPlusBold } from 'react-icons/pi';
import { getColumns } from './columns';

interface Proptypes {
  data: DATA_GURU[];
  onDeleteData: (id: string) => void;
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
};

export default function Table(props: Proptypes) {
  const { data, onDeleteData } = props;
  return (
    <>
      <TableLayout
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        data={data}
        urlButton={'/admin/guru/tambah'}
        buttonText={'Tambah Guru'}
        iconText={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
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
  );
}
