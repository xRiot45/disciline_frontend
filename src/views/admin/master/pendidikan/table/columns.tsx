import Link from 'next/link';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/shared/delete-popover';
import { HeaderCell } from '@/components/ui/table';
import { DATA_PENDIDIKAN } from '@/types/master/pendidikan/type';
import { ActionIcon, Text, Tooltip } from 'rizzui';

interface Columns {
  data: DATA_PENDIDIKAN[];
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
    title: <HeaderCell title="Nama Pendidikan" />,
    dataIndex: 'nama_pendidikan',
    key: 'nama_pendidikan',
    render: (nama_pendidikan: string) => (
      <Text className="text-sm">{nama_pendidikan}</Text>
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
          content={'Edit Pendidikan'}
          placement="top"
          color="invert"
        >
          <Link href={`/admin/master/pendidikan/edit/${id}`}>
            <ActionIcon
              size="sm"
              variant="outline"
              aria-label={'Edit Pendidikan'}
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>

        <DeletePopover
          title={`Hapus Pendidikan`}
          description={`Apakah kamu yakin ingin mengapus pendidikan ini? `}
          onDelete={() => onDeleteItem(id)}
        />
      </div>
    ),
  },
];
