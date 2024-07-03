import { metaObject } from '@/config/site.config'
import StatusView from '@/views/admin/master/status'

export const metadata = {
  ...metaObject('Status'),
}

export default function StatusPage() {
  return (
    <>
      <StatusView />
    </>
  )
}
