import { metaObject } from '@/config/site.config'
import GuruView from '@/views/admin/guru'

export const metadata = {
  ...metaObject('Guru'),
}

export default function GuruPage() {
  return (
    <>
      <GuruView />
    </>
  )
}
