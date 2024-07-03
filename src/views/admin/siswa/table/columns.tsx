import Link from 'next/link';
import PencilIcon from '@/components/icons/pencil';
import FormatTanggal from '@/helpers/formatTanggal';
import DeletePopover from '@/shared/delete-popover';
import { DATA_SISWA } from '@/types/siswa/type';
import { HeaderCell } from '@/components/ui/table';
import { ActionIcon, Text, Tooltip } from 'rizzui';

interface Columns {
  data: DATA_SISWA[];
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
    title: <HeaderCell title="NIS" />,
    dataIndex: 'nis',
    key: 'nis',
    render: (nis: string) => <Text className="text-sm">{nis}</Text>,
  },

  {
    title: <HeaderCell title="NISN" />,
    dataIndex: 'nisn',
    key: 'nisn',
    render: (nisn: string) => <Text className="text-sm">{nisn}</Text>,
  },

  {
    title: <HeaderCell title="Tanggal Lahir" />,
    dataIndex: 'tanggal_lahir',
    key: 'tanggal_lahir',
    render: (tanggal_lahir: string) => (
      <Text className="text-sm">{FormatTanggal(tanggal_lahir)}</Text>
    ),
  },

  {
    title: <HeaderCell title="Tempat Lahir" />,
    dataIndex: 'tempat_lahir',
    key: 'tempat_lahir',
    render: (tempat_lahir: string) => (
      <Text className="text-sm">{tempat_lahir}</Text>
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
    title: <HeaderCell title="Agama" />,
    dataIndex: 'agama',
    key: 'agama',
    render: (agama: { nama_agama: string }) => (
      <Text className="text-sm">{agama?.nama_agama}</Text>
    ),
  },

  {
    title: <HeaderCell title="Kelas" />,
    dataIndex: 'kelas',
    key: 'kelas',
    render: (kelas: { nama_kelas: string }) => (
      <Text className="text-sm">{kelas?.nama_kelas}</Text>
    ),
  },

  {
    title: <HeaderCell title="Nama Wali" />,
    dataIndex: 'nama_wali',
    key: 'nama_wali',
    render: (nama_wali: string) => <Text className="text-sm">{nama_wali}</Text>,
  },

  {
    title: <HeaderCell title="No Telp Wali" />,
    dataIndex: 'no_telp_wali',
    key: 'no_telp_wali',
    render: (no_telp_wali: string) => (
      <Text className="text-sm">{no_telp_wali}</Text>
    ),
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
        <Tooltip
          size="sm"
          content={'Edit Siswa'}
          placement="top"
          color="invert"
        >
          <Link href={`/admin/siswa/edit/${id}`}>
            <ActionIcon size="sm" variant="outline" aria-label={'Edit Siswa'}>
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>

        <DeletePopover
          title={`Hapus Siswa`}
          description={`Apakah kamu yakin ingin mengapus data siswa ini? `}
          onDelete={() => onDeleteItem(id)}
        />
      </div>
    ),
  },
];
