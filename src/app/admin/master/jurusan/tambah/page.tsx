import { metaObject } from '@/config/site.config'
import TambahJurusanView from '@/views/admin/master/jurusan/form/tambah'

export const metadata = {
  ...metaObject('Tambah Jurusan'),
}

export default function TambahJurusanPage() {
  return (
    <>
      <TambahJurusanView />
    </>
  )
}
