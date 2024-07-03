import { metaObject } from '@/config/site.config'
import EditStatusView from '@/views/admin/master/status/form/edit'

export const metadata = {
  ...metaObject('Edit Status'),
}

export default function EditStatusPage() {
  return (
    <>
      <EditStatusView />
    </>
  )
}
