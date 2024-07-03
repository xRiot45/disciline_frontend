import { metaObject } from '@/config/site.config'
import PendidikanView from '@/views/admin/master/pendidikan'

export const metadata = {
  ...metaObject('Pendidikan'),
}

export default function PendidikanPage() {
  return (
    <>
      <PendidikanView />
    </>
  )
}
