import { metaObject } from '@/config/site.config'
import TambahStatusView from '@/views/admin/master/status/form/tambah'

export const metadata = {
  ...metaObject('Tambah Status'),
}

export default function TambahStatusPage() {
  return (
    <>
      <TambahStatusView />
    </>
  )
}
