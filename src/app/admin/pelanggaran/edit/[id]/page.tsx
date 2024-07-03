import { metaObject } from '@/config/site.config'
import EditPelanggaranView from '@/views/admin/pelanggaran/form/edit'

export const metadata = {
  ...metaObject('Edit Pelanggaran'),
}

export default function EditelanggaranPage() {
  return (
    <>
      <EditPelanggaranView />
    </>
  )
}
