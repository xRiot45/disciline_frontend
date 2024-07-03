import { metaObject } from '@/config/site.config'
import PelanggaranView from '@/views/admin/pelanggaran'

export const metadata = {
  ...metaObject('Pelanggaran'),
}

export default function PelanggaranPage() {
  return (
    <>
      <PelanggaranView />
    </>
  )
}
