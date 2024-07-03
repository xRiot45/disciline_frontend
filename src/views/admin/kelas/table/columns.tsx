import Link from 'next/link';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/shared/delete-popover';
import { HeaderCell } from '@/components/ui/table';
import { DATA_KELAS } from '@/types/kelas/type';
import { ActionIcon, Text, Tooltip } from 'rizzui';

interface Columns {
  data: DATA_KELAS[];
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
    title: <HeaderCell title="Kelas" />,
    dataIndex: 'nama_kelas',
    key: 'nama_kelas',
    render: (nama_kelas: string) => (
      <Text className="text-sm">{nama_kelas}</Text>
    ),
  },

  {
    title: <HeaderCell title="Jurusan" />,
    dataIndex: 'jurusan',
    key: 'jurusan',
    render: (jurusan: { nama_jurusan: string }) => (
      <Text className="text-sm">{jurusan?.nama_jurusan}</Text>
    ),
  },
  {
    title: <HeaderCell title="Wali Kelas" />,
    dataIndex: 'guru',
    key: 'guru',
    render: (guru: { nama_guru: string }) => (
      <Text className="text-sm">{guru?.nama_guru}</Text>
    ),
  },
  {
    title: <HeaderCell title="No Telp Wali Kelas" />,
    dataIndex: 'guru',
    key: 'guru',
    render: (guru: { no_telp: string }) => (
      <Text className="text-sm">{guru?.no_telp}</Text>
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
          content={'Edit Kelas'}
          placement="top"
          color="invert"
        >
          <Link href={`/admin/kelas/edit/${id}`}>
            <ActionIcon size="sm" variant="outline" aria-label={'Edit Kelas'}>
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>

        <DeletePopover
          title={`Hapus Kelas`}
          description={`Apakah kamu yakin ingin mengapus data kelas ini? `}
          onDelete={() => onDeleteItem(id)}
        />
      </div>
    ),
  },
];
