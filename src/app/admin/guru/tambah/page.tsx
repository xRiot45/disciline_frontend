import { metaObject } from '@/config/site.config'
import TambahGuruView from '@/views/admin/guru/form/tambah'

export const metadata = {
  ...metaObject('Tambah Guru'),
}

export default function TambahGuruPage() {
  return (
    <>
      <TambahGuruView />
    </>
  )
}
