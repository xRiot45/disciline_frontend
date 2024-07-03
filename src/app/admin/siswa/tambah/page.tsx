import { metaObject } from '@/config/site.config'
import TambahSiswaView from '@/views/admin/siswa/form/tambah'

export const metadata = {
  ...metaObject('Tambah Siswa'),
}

export default function TambahSiswaPage() {
  return (
    <>
      <TambahSiswaView />
    </>
  )
}
