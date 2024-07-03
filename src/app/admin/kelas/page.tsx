import { metaObject } from '@/config/site.config'
import KelasView from '@/views/admin/kelas'

export const metadata = {
  ...metaObject('Kelas'),
}

export default function KelasPage() {
  return (
    <>
      <KelasView />
    </>
  )
}
