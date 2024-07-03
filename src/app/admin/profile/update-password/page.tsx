import { metaObject } from '@/config/site.config';
import UpdatePasswordView from '@/views/admin/profile/update-password';

export const metadata = {
  ...metaObject('Update Password'),
};

export default function UpdatePasswordPage() {
  return (
    <>
      <UpdatePasswordView />
    </>
  );
}
