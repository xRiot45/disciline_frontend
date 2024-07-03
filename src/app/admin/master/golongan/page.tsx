import { metaObject } from '@/config/site.config'
import GolonganView from '@/views/admin/master/golongan'

export const metadata = {
  ...metaObject('Golongan'),
}

export default function GolonganPage() {
  return (
    <>
      <GolonganView />
    </>
  )
}
