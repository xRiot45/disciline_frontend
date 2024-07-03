import { metaObject } from '@/config/site.config';
import SignView from '@/views/auth/signin';

export const metadata = {
  ...metaObject('Sign In'),
};

export default function SignInPage() {
  return (
    <>
      <SignView />
    </>
  );
}
