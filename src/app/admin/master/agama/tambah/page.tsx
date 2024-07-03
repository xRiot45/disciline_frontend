import { metaObject } from '@/config/site.config'
import TambahAgamaView from '@/views/admin/master/agama/form/tambah'

export const metadata = {
  ...metaObject('Tambah Agama'),
}

export default function TambahAgamaPage() {
  return (
    <>
      <TambahAgamaView />
    </>
  )
}
