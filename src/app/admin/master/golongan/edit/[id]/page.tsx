import { metaObject } from '@/config/site.config'
import EditGolonganView from '@/views/admin/master/golongan/form/edit'

export const metadata = {
  ...metaObject('Edit Golongan'),
}

export default function EditGolonganPage() {
  return (
    <>
      <EditGolonganView />
    </>
  )
}
