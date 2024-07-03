import { metaObject } from '@/config/site.config'
import TambahGolonganView from '@/views/admin/master/golongan/form/tambah'

export const metadata = {
  ...metaObject('Tambah Golongan'),
}

export default function TambahGolonganPage() {
  return (
    <>
      <TambahGolonganView />
    </>
  )
}
