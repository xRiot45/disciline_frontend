import { metaObject } from '@/config/site.config'
import TambahJabatanView from '@/views/admin/master/jabatan/table/form/tambah'

export const metadata = {
  ...metaObject('Tambah Jabatan'),
}

export default function TambahJabatanPage() {
  return (
    <>
      <TambahJabatanView />
    </>
  )
}
