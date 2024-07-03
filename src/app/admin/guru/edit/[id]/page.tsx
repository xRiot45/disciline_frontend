import { metaObject } from '@/config/site.config'
import EditGuruView from '@/views/admin/guru/form/edit'

export const metadata = {
  ...metaObject('Edit Guru'),
}

export default function EditGuruPage() {
  return (
    <>
      <EditGuruView />
    </>
  )
}
