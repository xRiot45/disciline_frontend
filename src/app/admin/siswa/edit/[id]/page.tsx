import { metaObject } from '@/config/site.config'
import EditSiswaView from '@/views/admin/siswa/form/edit'

export const metadata = {
  ...metaObject('Edit Siswa'),
}

export default function EditSiswaPage() {
  return (
    <>
      <EditSiswaView />
    </>
  )
}
