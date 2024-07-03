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
  title: 'Golongan',
  breadcrumb: [
    {
      href: '/admin/dashboard',
      name: 'Dashboard',
    },
    {
      href: '/admin/master/golongan',
      name: 'Golongan',
    },
    {
      name: 'Edit Golongan',
    },
  ],
};

export default function EditGolonganView() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [cookies] = useCookies(['accessToken']);
  const [namagolongan, setNamagolongan] = useState<string | any>('');

  useEffect(() => {
    const fetchDataById = async () => {
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const res = await axios.get(
          `${process.env.API_URL}/api/master/golongan/${id}`,
          { headers }
        );
        setNamagolongan(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataById();
  }, [cookies.accessToken, id]);

  const handleSubmit = async (values: z.infer<typeof validationSchema>) => {
    try {
      const accessToken = cookies.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const res = await axios.put(
        `${process.env.API_URL}/api/master/golongan/${id}`,
        values,
        { headers }
      );

      if (res.status === 200) {
        toast.success('Golongan berhasil diedit!');
        router.refresh();
        router.push('/admin/master/golongan');
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        toast.error('Golongan sudah ada');
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
        onSubmit={handleSubmit}
        resetValues={false}
        validationSchema={validationSchema}
        useFormProps={{
          values: {
            nama_golongan: namagolongan?.nama_golongan,
          },
          mode: 'onChange',
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-3">
            <FormLayout register={register} errors={errors} />

            <div className="flex items-center justify-end gap-3">
              <Button type="submit" size="lg">
                Edit golongan
              </Button>
              <Link href="/admin/master/golongan">
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
