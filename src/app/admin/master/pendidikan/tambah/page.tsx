import { metaObject } from '@/config/site.config'
import TambahPendidikanView from '@/views/admin/master/pendidikan/form/tambah'

export const metadata = {
  ...metaObject('Tambah Pendidikan'),
}

export default function TambahPendidikanPage() {
  return (
    <>
      <TambahPendidikanView />
    </>
  )
}
