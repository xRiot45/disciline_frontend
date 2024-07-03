import { metaObject } from '@/config/site.config'
import JurusanView from '@/views/admin/master/jurusan'

export const metadata = {
  ...metaObject('Jurusan'),
}

export default function JurusanPage() {
  return (
    <>
      <JurusanView />
    </>
  )
}
