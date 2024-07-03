import { metaObject } from '@/config/site.config'
import TipePelanggaranView from '@/views/admin/master/tipe-pelanggaran'

export const metadata = {
  ...metaObject('Tipe Pelanggaran'),
}

export default function TipePelanggaranPage() {
  return (
    <>
      <TipePelanggaranView />
    </>
  )
}
