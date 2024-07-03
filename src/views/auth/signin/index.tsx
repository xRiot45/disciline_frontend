import FormLayout from './form';
import AuthWrapper from '@/shared/auth-layout/auth-wrapper';

export default function SignView() {
  return (
    <AuthWrapper
      title={
        <>
          <span className="bg-gradient-to-r from-gray-700 to-gray-950 bg-clip-text text-transparent">
            Selamat datang!
          </span>{' '}
          Silahkan login terlebih dahulu
        </>
      }
      isSignIn
      isSocialLoginActive={true}
    >
      <FormLayout />
    </AuthWrapper>
  );
}
