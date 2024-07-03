import Link from 'next/link';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/shared/delete-popover';
import { HeaderCell } from '@/components/ui/table';
import { DATA_STATUS } from '@/types/master/status/type';
import { ActionIcon, Text, Tooltip } from 'rizzui';

interface Columns {
  data: DATA_STATUS[];
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
    title: <HeaderCell title="Nama Status" />,
    dataIndex: 'nama_status',
    key: 'nama_status',
    render: (nama_status: string) => (
      <Text className="text-sm">{nama_status}</Text>
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
          content={'Edit Status'}
          placement="top"
          color="invert"
        >
          <Link href={`/admin/master/status/edit/${id}`}>
            <ActionIcon size="sm" variant="outline" aria-label={'Edit Status'}>
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>

        <DeletePopover
          title={`Hapus Status`}
          description={`Apakah kamu yakin ingin mengapus status ini? `}
          onDelete={() => onDeleteItem(id)}
        />
      </div>
    ),
  },
];
