import { metaObject } from '@/config/site.config'
import EditKelasView from '@/views/admin/kelas/form/edit'

export const metadata = {
  ...metaObject('Edit Kelas'),
}

export default function EditKelasPage() {
  return (
    <>
      <EditKelasView />
    </>
  )
}
