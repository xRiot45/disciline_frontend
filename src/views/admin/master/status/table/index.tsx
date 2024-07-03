import TableLayout from '@/layouts/table-layout';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import { PiPlusBold } from 'react-icons/pi';
import { getColumns } from './columns';
import { DATA_STATUS } from '@/types/master/status/type';

interface Proptypes {
  data: DATA_STATUS[];
  onDeleteData: (id: string) => void;
}

const pageHeader = {
  title: 'Status',
  breadcrumb: [
    {
      href: '/admin/dashboard',
      name: 'Dashboard',
    },
    {
      name: 'Status',
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
        urlButton={'/admin/master/status/tambah'}
        buttonText={'Tambah Status'}
        iconText={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
      >
        <BasicTableWidget
          title="Data Status"
          variant="modern"
          data={data}
          // @ts-ignore
          getColumns={getColumns}
          onDelete={onDeleteData}
          enablePagination
          searchPlaceholder="Cari status..."
          className="min-h-[480px] [&_.widget-card-header]:items-center [&_.widget-card-header_h5]:font-medium"
        />
      </TableLayout>
    </>
  );
}
