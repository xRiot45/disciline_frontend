import Link from 'next/link';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/shared/delete-popover';
import { HeaderCell } from '@/components/ui/table';
import { DATA_JURUSAN } from '@/types/master/jurusan/type';
import { ActionIcon, Text, Tooltip } from 'rizzui';

interface Columns {
  data: DATA_JURUSAN[];
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
    title: <HeaderCell title="Nama Jurusan" />,
    dataIndex: 'nama_jurusan',
    key: 'nama_jurusan',
    render: (nama_jurusan: string) => (
      <Text className="text-sm">{nama_jurusan}</Text>
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
          content={'Edit Jurusan'}
          placement="top"
          color="invert"
        >
          <Link href={`/admin/master/jurusan/edit/${id}`}>
            <ActionIcon size="sm" variant="outline" aria-label={'Edit Jurusan'}>
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>

        <DeletePopover
          title={`Hapus Jurusan`}
          description={`Apakah kamu yakin ingin mengapus jurusan ini? `}
          onDelete={() => onDeleteItem(id)}
        />
      </div>
    ),
  },
];
