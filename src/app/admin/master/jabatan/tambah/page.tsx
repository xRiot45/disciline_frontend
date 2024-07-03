import { metaObject } from '@/config/site.config';
import TambahJabatanView from '@/views/admin/master/jabatan/form/tambah';

export const metadata = {
  ...metaObject('Tambah Jabatan'),
};

export default function TambahJabatanPage() {
  return (
    <>
      <TambahJabatanView />
    </>
  );
}
