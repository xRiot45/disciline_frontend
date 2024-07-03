import Link from 'next/link';
import PencilIcon from '@/components/icons/pencil';
import { HeaderCell } from '@/components/ui/table';
import { ActionIcon, Text, Tooltip } from 'rizzui';

export const getColumns = () => [
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
    title: <HeaderCell title="Pelanggaran Yang Dilakukan" />,
    dataIndex: 'tipe_pelanggaran',
    key: 'tipe_pelanggaran',
    render: (tipe_pelanggaran: { nama_tipe_pelanggaran: string }) => (
      <Text className="text-sm">{tipe_pelanggaran?.nama_tipe_pelanggaran}</Text>
    ),
  },

  {
    title: <HeaderCell title="Siswa" />,
    dataIndex: 'siswa',
    key: 'siswa',
    render: (siswa: { nama_lengkap: string }) => (
      <Text className="text-sm">{siswa?.nama_lengkap}</Text>
    ),
  },

  {
    title: <HeaderCell title="Kelas" />,
    dataIndex: 'siswa',
    key: 'siswa',
    render: (siswa: { kelas: { nama_kelas: string } }) => (
      <Text className="text-sm">{siswa?.kelas?.nama_kelas}</Text>
    ),
  },

  {
    title: <HeaderCell title="Nama Wali" />,
    dataIndex: 'siswa',
    key: 'siswa',
    render: (siswa: { nama_wali: string }) => (
      <Text className="text-sm">{siswa?.nama_wali}</Text>
    ),
  },

  {
    title: <HeaderCell title="No Telp Wali" />,
    dataIndex: 'siswa',
    key: 'siswa',
    render: (siswa: { no_telp_wali: string }) => (
      <Text className="text-sm">{siswa?.no_telp_wali}</Text>
    ),
  },

  {
    title: <HeaderCell title="Alamat" />,
    dataIndex: 'siswa',
    key: 'siswa',
    render: (siswa: { alamat: string }) => (
      <Text className="text-sm">{siswa?.alamat}</Text>
    ),
  },

  {
    title: <HeaderCell title="Keterangan" />,
    dataIndex: 'keterangan',
    key: 'keterangan',
    render: (keterangan: string) => (
      <Text className="text-sm">{keterangan ? keterangan : '-'}</Text>
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
          content={'Edit Pelanggaran'}
          placement="top"
          color="invert"
        >
          <Link href={`/admin/pelanggaran/edit/${id}`}>
            <ActionIcon
              size="sm"
              variant="outline"
              aria-label={'Edit Pelanggaran'}
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Link>
        </Tooltip>
      </div>
    ),
  },
];
