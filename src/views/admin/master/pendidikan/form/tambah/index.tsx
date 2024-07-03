'use client';

import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import FormLayout from '../index';
import PageHeader from '@/shared/page-header';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from 'rizzui';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { validationSchema, ValidationSchema } from '../validationSchema';

const pageHeader = {
  title: 'Tambah Pendidikan',
  breadcrumb: [
    {
      href: '/admin/dashboard',
      name: 'Dashboard',
    },
    {
      href: '/admin/master/pendidikan',
      name: 'Pendidikan',
    },
    {
      name: 'Tambah Pendidikan',
    },
  ],
};

export default function TambahPendidikanView() {
  const router = useRouter();
  const [cookies] = useCookies<string>(['accessToken']);

  const handleAddPendidikan = async (
    values: z.infer<typeof validationSchema>
  ) => {
    try {
      const accessToken = cookies.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const res = await axios.post(
        `${process.env.API_URL}/api/master/pendidikan`,
        values,
        { headers }
      );

      if (res.status === 201) {
        toast.success('Pendidikan berhasil ditambahkan!');
        router.refresh();
        router.push('/admin/master/pendidikan');
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        console.log('error', error.response.data);
        toast.error('Pendidikan sudah ada');
      } else {
        console.log('error', error.response.data);
        toast.error(
          'Terjadi kesalahan saat menambahkan data, silahkan coba lagi!'
        );
      }
    }
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <Form<ValidationSchema>
        validationSchema={validationSchema}
        onSubmit={handleAddPendidikan}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-3">
            <FormLayout register={register} errors={errors} />

            <div className="flex items-center justify-end gap-3">
              <Button type="submit" size="lg">
                Tambah Pendidikan
              </Button>
              <Link href="/admin/master/pendidikan">
                <Button
                  size="lg"
                  className=" cursor-pointer bg-red-500 hover:bg-red-700 "
                >
                  Batalkan
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Form>
    </>
  );
}
