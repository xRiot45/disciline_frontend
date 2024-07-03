import { metaObject } from '@/config/site.config'
import TambahKelasView from '@/views/admin/kelas/form/tambah'

export const metadata = {
  ...metaObject('Tambah Kelas'),
}

export default function TambahKelasPage() {
  return (
    <>
      <TambahKelasView />
    </>
  )
}
