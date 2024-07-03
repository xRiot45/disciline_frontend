import TableLayout from '@/layouts/table-layout';
import BasicTableWidget from '@/components/controlled-table/basic-table-widget';
import { PiPlusBold } from 'react-icons/pi';
import { getColumns } from './columns';
import { FaFileExcel } from 'react-icons/fa';
import { DATA_PELANGGARAN } from '@/types/pelanggaran/type';

interface PropTypes {
  data: DATA_PELANGGARAN[];
  handleExport?: () => void;
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
};

export default function Table(props: PropTypes) {
  const { data, handleExport } = props;
  return (
    <>
      <TableLayout
        title={pageHeader.title}
        breadcrumb={pageHeader.breadcrumb}
        data={data}
        urlButton={'/admin/pelanggaran/tambah'}
        buttonText={'Tambah Pelanggaran'}
        iconText={<PiPlusBold className="me-1.5 h-[17px] w-[17px]" />}
        buttonExport={'Export Data'}
        iconExport={<FaFileExcel className="me-1.5 h-[17px] w-[17px]" />}
        variantExport="bg-green-500 hover:bg-green-600"
        handleExport={handleExport}
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
  );
}
