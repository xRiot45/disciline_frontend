import { metaObject } from '@/config/site.config'
import TambahTipePelanggaranView from '@/views/admin/master/tipe-pelanggaran/form/tambah'

export const metadata = {
  ...metaObject('Tambah Tipe Pelanggaran'),
}

export default function TambahTipePelanggaranPage() {
  return (
    <>
      <TambahTipePelanggaranView />
    </>
  )
}
