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
  title: 'Edit Golongan',
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
  const [cookies] = useCookies<string>(['accessToken']);
  const [dataGolongan, setDataGolongan] = useState({
    nama_golongan: '' as string,
  });

  useEffect(() => {
    const fetchDataGolonganById = async () => {
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const res = await axios.get(
          `${process.env.API_URL}/api/master/golongan/${id}`,
          { headers }
        );

        setDataGolongan(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataGolonganById();
  }, [cookies.accessToken, id]);

  const handleEditGolongan = async (
    values: z.infer<typeof validationSchema>
  ) => {
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
        console.log(error);
        toast.error('Golongan sudah ada');
      } else {
        console.log(error);
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
        onSubmit={handleEditGolongan}
        resetValues={false}
        validationSchema={validationSchema}
        useFormProps={{
          values: {
            nama_golongan: dataGolongan?.nama_golongan,
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
