import { metaObject } from '@/config/site.config'
import AgamaView from '@/views/admin/master/agama'

export const metadata = {
  ...metaObject('Agama'),
}

export default function AgamaPage() {
  return (
    <>
      <AgamaView />
    </>
  )
}
