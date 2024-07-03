import Link from 'next/link';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/shared/delete-popover';
import { HeaderCell } from '@/components/ui/table';
import { DATA_TIPE_PELANGGARAN } from '@/types/master/tipe-pelanggaran/type';
import { ActionIcon, Text, Tooltip } from 'rizzui';

interface Columns {
  data: DATA_TIPE_PELANGGARAN[];
  onDeleteItem: (id: string) => void;
}

export const getColumns = ({ onDeleteItem }: Columns) => [
  {
    title: <HeaderCell title="No" />,
    width: 50,
    dataIndex: 'index',
    key: 'index',
    render: (text: unknown, record: unknown, index: number) => (
      <Text className="text-sm">{index + 1}</Text>
    ),
  },
  {
    title: <HeaderCell title="Nama Tipe Pelanggaran" />,
    dataIndex: 'nama_tipe_pelanggaran',
    key: 'nama_tipe_pelanggaran',
    render: (nama_tipe_pelanggaran: string) => (
      <Text className="text-sm">{nama_tipe_pelanggaran}</Text>
    ),
  },
  {
    title: <HeaderCell title="Aksi" />,
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
