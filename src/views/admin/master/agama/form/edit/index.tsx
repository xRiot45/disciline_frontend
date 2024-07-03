'use client';

import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import FormLayout from '../index';
import PageHeader from '@/shared/page-header';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from 'rizzui';
import { useCookies } from 'react-cookie';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { validationSchema, ValidationSchema } from '../validationSchema';

const pageHeader = {
  title: 'Edit Agama',
  breadcrumb: [
    {
      href: '/admin/dashboard',
      name: 'Dashboard',
    },
    {
      href: '/admin/master/agama',
      name: 'Agama',
    },
    {
      name: 'Edit Agama',
    },
  ],
};

export default function EditAgamaView() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [cookies] = useCookies<string>(['accessToken']);
  const [dataAgama, setDataAgama] = useState({
    nama_agama: '' as string,
  });

  useEffect(() => {
    const fetchDataAgamaById = async () => {
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const res = await axios.get(
          `${process.env.API_URL}/api/master/agama/${id}`,
          { headers }
        );

        setDataAgama(res?.data?.data);
      } catch (error) {
        console.log('error: fetch data agama by id', error);
      }
    };

    fetchDataAgamaById();
  }, [cookies.accessToken, id]);

  const handleEditAgama = async (values: z.infer<typeof validationSchema>) => {
    try {
      const accessToken = cookies.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const res = await axios.put(
        `${process.env.API_URL}/api/master/agama/${id}`,
        values,
        { headers }
      );

      if (res.status === 200) {
        toast.success('Agama berhasil diedit!');
        router.refresh();
        router.push('/admin/master/agama');
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        toast.error('Agama sudah ada!');
      } else {
        toast.error(
          'Terjadi kesalahan saat mengubah data, silahkan coba lagi!'
        );
      }
    }
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <Form<ValidationSchema>
        onSubmit={handleEditAgama}
        resetValues={false}
        validationSchema={validationSchema}
        useFormProps={{
          values: {
            nama_agama: dataAgama?.nama_agama,
          },
          mode: 'onChange',
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-3">
            <FormLayout register={register} errors={errors} />

            <div className="flex items-center justify-end gap-3">
              <Button type="submit" size="lg">
                Edit Agama
              </Button>
              <Link href="/admin/master/agama">
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
