import { metaObject } from '@/config/site.config'
import EditAgamaView from '@/views/admin/master/agama/form/edit'

export const metadata = {
  ...metaObject('Edit Agama'),
}

export default function EditAgamaPage() {
  return (
    <>
      <EditAgamaView />
    </>
  )
}
