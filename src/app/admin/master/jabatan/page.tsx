import { metaObject } from '@/config/site.config'
import JabatanView from '@/views/admin/master/jabatan'

export const metadata = {
  ...metaObject('Jabatan'),
}

export default function JabatanPage() {
  return (
    <>
      <JabatanView />
    </>
  )
}
