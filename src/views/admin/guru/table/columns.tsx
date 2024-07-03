import Link from 'next/link';
import PencilIcon from '@/components/icons/pencil';
import DeletePopover from '@/shared/delete-popover';
import { DATA_GURU } from '@/types/guru/type';
import { HeaderCell } from '@/components/ui/table';
import { ActionIcon, Text, Tooltip } from 'rizzui';

interface Columns {
  data: DATA_GURU[];
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
    title: <HeaderCell title="Nama Lengkap" />,
    dataIndex: 'nama_lengkap',
    key: 'nama_lengkap',
    render: (nama_lengkap: string) => (
      <Text className="text-sm">{nama_lengkap}</Text>
    ),
  },
  {
    title: <HeaderCell title="NIP" />,
    dataIndex: 'nip',
    key: 'nip',
    render: (nip: string) => <Text className="text-sm">{nip}</Text>,
  },
  {
    title: <HeaderCell title="Status" />,
    dataIndex: 'status',
    key: 'status',
    render: (status: { nama_status: string }) => (
      <Text className="text-sm">{status?.nama_status}</Text>
    ),
  },
  {
    title: <HeaderCell title="Jabatan" />,
    dataIndex: 'jabatan',
    key: 'jabatan',
    render: (jabatan: { nama_jabatan: string }) => (
      <Text className="text-sm">{jabatan?.nama_jabatan}</Text>
    ),
  },
  {
    title: <HeaderCell title="Golongan" />,
    dataIndex: 'golongan',
    key: 'golongan',
    render: (golongan: { nama_golongan: string }) => (
      <Text className="text-sm">{golongan?.nama_golongan}</Text>
    ),
  },
  {
    title: <HeaderCell title="Agama" />,
    dataIndex: 'agama',
    key: 'agama',
    render: (agama: { nama_agama: string }) => (
      <Text className="text-sm">{agama?.nama_agama}</Text>
    ),
  },
  {
    title: <HeaderCell title="Jenis Kelamin" />,
    dataIndex: 'jenis_kelamin',
    key: 'jenis_kelamin',
    render: (jenis_kelamin: string) => (
      <Text className="text-sm">{jenis_kelamin}</Text>
    ),
  },
  {
    title: <HeaderCell title="No Telp" />,
    dataIndex: 'no_telp',
    key: 'no_telp',
    render: (no_telp: string) => <Text className="text-sm">{no_telp}</Text>,
  },
  {
    title: <HeaderCell title="Alamat" />,
    dataIndex: 'alamat',
    key: 'alamat',
    render: (alamat: string) => <Text className="text-sm">{alamat}</Text>,
  },
  {
    title: <HeaderCell title="Aksi" />,
    dataIndex: 'id',
    width: 20,
    key: 'id',
    render: (id: string) => (
      <div className="flex items-center justify-end gap-3 pe-4">
        <Tooltip size="sm" content={'Edit Guru'} placement="top" color="invert">
          <Link href={`/admin/guru/edit/${id}`}>
            <ActionIcon size="sm" variant="outline" aria-label={'Edit Guru'}>
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>

        <DeletePopover
          title={`Hapus Guru`}
          description={`Apakah kamu yakin ingin mengapus data guru ini? `}
          onDelete={() => onDeleteItem(id)}
        />
      </div>
    ),
  },
];
