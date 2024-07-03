import { metaObject } from '@/config/site.config'
import EditTipePelanggaranView from '@/views/admin/master/tipe-pelanggaran/form/edit'

export const metadata = {
  ...metaObject('Edit Tipe Pelanggaran'),
}

export default function EditTipePelanggaranPage() {
  return (
    <>
      <EditTipePelanggaranView />
    </>
  )
}
