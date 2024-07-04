'use client';

import toast from 'react-hot-toast';
import axios from 'axios';
import FormLayout from './form';
import PageHeader from '@/shared/page-header';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { validationSchema } from './form/validationSchema';

const pageHeader = {
  title: 'Update Password',
  breadcrumb: [
    {
      href: '/admin/dashboard',
      name: 'Dashboard',
    },

    {
      name: 'Update Password',
    },
  ],
};

export default function UpdatePasswordView() {
  const router = useRouter();
  const [cookies] = useCookies<string>(['accessToken']);

  const handleUpdatePassword = async (
    values: z.infer<typeof validationSchema>
  ) => {
    try {
      const accessToken = cookies.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const res = await axios.put(
        `${process.env.API_URL}/api/users/update-password`,
        values,
        { headers }
      );

      if (res.status === 200) {
        toast.success('Password berhasil diubah!');
        router.push('/admin/dashboard');
      }
    } catch (error) {
      console.log(error);
      toast.error(
        'Terjadi kesalahan saat mengubah password, silahkan coba lagi!'
      );
    }
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <FormLayout submit={handleUpdatePassword} />
    </>
  );
}
