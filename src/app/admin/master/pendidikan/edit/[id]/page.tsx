import { metaObject } from '@/config/site.config';
import EditPendidikanView from '@/views/admin/master/pendidikan/form/edit';

export const metadata = {
  ...metaObject('Edit Pendidikan'),
};

export default function EditPendidikanPage() {
  return (
    <>
      <EditPendidikanView />
    </>
  );
}
