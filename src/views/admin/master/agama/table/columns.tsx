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
    title: <HeaderCell title="Nama Agama" />,
    dataIndex: 'nama_agama',
    key: 'nama_agama',
    render: (nama_agama: string) => (
      <Text className="text-sm">{nama_agama}</Text>
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
          content={'Edit Agama'}
          placement="top"
          color="invert"
        >
          <Link href={`/admin/master/agama/edit/${id}`}>
            <ActionIcon size="sm" variant="outline" aria-label={'Edit Agama'}>
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>

        <DeletePopover
          title={`Hapus Agama`}
          description={`Apakah kamu yakin ingin mengapus agama ini? `}
          onDelete={() => onDeleteItem(id)}
        />
      </div>
    ),
  },
];
