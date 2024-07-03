import { metaObject } from '@/config/site.config'
import TambahPelanggaranView from '@/views/admin/pelanggaran/form/tambah'

export const metadata = {
  ...metaObject('Tambah Pelanggaran'),
}

export default function TambahPelanggaranPage() {
  return (
    <>
      <TambahPelanggaranView />
    </>
  )
}
