import Link from 'next/link';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/shared/delete-popover';
import { HeaderCell } from '@/components/ui/table';
import { ActionIcon, Text, Tooltip } from 'rizzui';

type Columns = {
  data: any[];
  onDeleteItem: (id: string) => void;
};

export const getColumns = ({ onDeleteItem }: Columns) => [
  {
    title: <HeaderCell title="Nama Tipe Pelanggaran" />,
    dataIndex: 'nama_tipe_pelanggaran',
    key: 'nama_tipe_pelanggaran',
    render: (nama_tipe_pelanggaran: string) => (
      <Text className="text-sm">{nama_tipe_pelanggaran}</Text>
    ),
  },
  {
    title: <HeaderCell title="Actions" />,
    dataIndex: 'id',
    width: 20,
    key: 'id',
    render: (id: string) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip
          size="sm"
          content={'Edit Tipe Pelanggaran'}
          placement="top"
          color="invert"
        >
          <Link href={`/admin/master/tipe-pelanggaran/edit/${id}`}>
            <ActionIcon
              size="sm"
              variant="outline"
              aria-label={'Edit Tipe Pelanggaran'}
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>

        <DeletePopover
          title={`Hapus Tipe Pelanggaran`}
          description={`Apakah kamu yakin ingin mengapus tipe pelanggaran ini? `}
          onDelete={() => onDeleteItem(id)}
        />
      </div>
    ),
  },
];
