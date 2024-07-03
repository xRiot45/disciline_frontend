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
  title: 'Tambah Guru',
  breadcrumb: [
    {
      href: '/admin/dashboard',
      name: 'Dashboard',
    },
    {
      href: '/admin/guru',
      name: 'Guru',
    },
    {
      name: 'Tambah Guru',
    },
  ],
};

export default function TambahGuruView() {
  const router = useRouter();
  const [cookies] = useCookies<string>(['accessToken']);

  const handleAddGuru = async (values: z.infer<typeof validationSchema>) => {
    try {
      const accessToken = cookies.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const res = await axios.post(`${process.env.API_URL}/api/guru`, values, {
        headers,
      });

      if (res.status === 201) {
        toast.success('Guru berhasil ditambahkan!');
        router.refresh();
        router.push('/admin/guru');
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        console.log(error);
        toast.error('Guru sudah ada');
      } else {
        console.log(error);
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
        onSubmit={handleAddGuru}
      >
        {({ register, control, formState: { errors } }) => (
          <div className="space-y-3">
            <FormLayout control={control} register={register} errors={errors} />

            <div className="flex items-center justify-end gap-3">
              <Button type="submit" size="lg">
                Tambah Guru
              </Button>
              <Link href="/admin/guru">
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
