import { metaObject } from '@/config/site.config'
import EditJabatanView from '@/views/admin/master/jabatan/table/form/edit'

export const metadata = {
  ...metaObject('Edit Jabatan'),
}

export default function EditJabatanPage() {
  return (
    <>
      <EditJabatanView />
    </>
  )
}
