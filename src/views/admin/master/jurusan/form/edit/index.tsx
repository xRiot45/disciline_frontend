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
  title: 'Edit Jurusan',
  breadcrumb: [
    {
      href: '/admin/dashboard',
      name: 'Dashboard',
    },
    {
      href: '/admin/master/jurusan',
      name: 'Jurusan',
    },
    {
      name: 'Edit Jurusan',
    },
  ],
};

export default function EditJurusanView() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [cookies] = useCookies<string>(['accessToken']);
  const [dataJurusan, setDataJurusan] = useState({
    nama_jurusan: '' as string,
  });

  useEffect(() => {
    const fetchDataJurusanById = async () => {
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const res = await axios.get(
          `${process.env.API_URL}/api/master/jurusan/${id}`,
          { headers }
        );

        setDataJurusan(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataJurusanById();
  }, [cookies.accessToken, id]);

  const handleEditJurusan = async (
    values: z.infer<typeof validationSchema>
  ) => {
    try {
      const accessToken = cookies.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const res = await axios.put(
        `${process.env.API_URL}/api/master/jurusan/${id}`,
        values,
        { headers }
      );

      if (res.status === 200) {
        toast.success('Jurusan berhasil diedit!');
        router.refresh();
        router.push('/admin/master/jurusan');
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        console.log(error);
        toast.error('Jurusan sudah ada');
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
        onSubmit={handleEditJurusan}
        validationSchema={validationSchema}
        useFormProps={{
          values: {
            nama_jurusan: dataJurusan?.nama_jurusan,
          },
          mode: 'onChange',
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-3">
            <FormLayout register={register} errors={errors} />

            <div className="flex items-center justify-end gap-3">
              <Button type="submit" size="lg">
                Edit Jurusan
              </Button>
              <Link href="/admin/master/jurusan">
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
