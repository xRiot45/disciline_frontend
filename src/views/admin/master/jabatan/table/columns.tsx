import Link from 'next/link';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/shared/delete-popover';
import { HeaderCell } from '@/components/ui/table';
import { DATA_JABATAN } from '@/types/master/jabatan/type';
import { ActionIcon, Text, Tooltip } from 'rizzui';

interface Columns {
  data: DATA_JABATAN[];
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
    title: <HeaderCell title="Nama Jabatan" />,
    dataIndex: 'nama_jabatan',
    key: 'nama_jabatan',
    render: (nama_jabatan: string) => (
      <Text className="text-sm">{nama_jabatan}</Text>
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
          content={'Edit jabatan'}
          placement="top"
          color="invert"
        >
          <Link href={`/admin/master/jabatan/edit/${id}`}>
            <ActionIcon size="sm" variant="outline" aria-label={'Edit jabatan'}>
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>

        <DeletePopover
          title={`Hapus jabatan`}
          description={`Apakah kamu yakin ingin mengapus jabatan ini? `}
          onDelete={() => onDeleteItem(id)}
        />
      </div>
    ),
  },
];
