import { metaObject } from '@/config/site.config'
import EditJurusanView from '@/views/admin/master/jurusan/form/edit'

export const metadata = {
  ...metaObject('Edit Jurusan'),
}

export default function EditJurusanPage() {
  return (
    <>
      <EditJurusanView />
    </>
  )
}
