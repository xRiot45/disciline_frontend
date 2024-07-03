import { metaObject } from '@/config/site.config'
import SiswaView from '@/views/admin/siswa'

export const metadata = {
  ...metaObject('Siswa'),
}

export default function SiswaPage() {
  return (
    <>
      <SiswaView />
    </>
  )
}
