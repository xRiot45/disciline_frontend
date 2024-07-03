'use client';

import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import FormLayout from '../index';
import PageHeader from '@/shared/page-header';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { Button } from 'rizzui';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { usePathname, useRouter } from 'next/navigation';
import { validationSchema, ValidationSchema } from '../validationSchema';

const pageHeader = {
  title: 'Edit Pendidikan',
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
      name: 'Edit Pendidikan',
    },
  ],
};

export default function EditPendidikanView() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [cookies] = useCookies<string>(['accessToken']);
  const [dataPendidikan, setDataPendidikan] = useState({
    nama_pendidikan: '' as string,
  });

  useEffect(() => {
    const fetchDataPendidikanById = async () => {
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const res = await axios.get(
          `${process.env.API_URL}/api/master/pendidikan/${id}`,
          { headers }
        );

        setDataPendidikan(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataPendidikanById();
  }, [cookies.accessToken, id]);

  const handleEditPendidikan = async (
    values: z.infer<typeof validationSchema>
  ) => {
    try {
      const accessToken = cookies.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const res = await axios.put(
        `${process.env.API_URL}/api/master/pendidikan/${id}`,
        values,
        { headers }
      );

      if (res.status === 200) {
        toast.success('Pendidikan berhasil diedit!');
        router.refresh();
        router.push('/admin/master/pendidikan');
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        toast.error('Pendidikan sudah ada');
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
        onSubmit={handleEditPendidikan}
        resetValues={false}
        validationSchema={validationSchema}
        useFormProps={{
          values: {
            nama_pendidikan: dataPendidikan?.nama_pendidikan,
          },
          mode: 'onChange',
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-3">
            <FormLayout register={register} errors={errors} />

            <div className="flex items-center justify-end gap-3">
              <Button type="submit" size="lg">
                Edit Pendidikan
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
