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
  title: 'Edit Jabatan',
  breadcrumb: [
    {
      href: '/admin/dashboard',
      name: 'Dashboard',
    },
    {
      href: '/admin/master/jabatan',
      name: 'Jabatan',
    },
    {
      name: 'Edit Jabatan',
    },
  ],
};

export default function EditJabatanView() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [cookies] = useCookies<string>(['accessToken']);
  const [dataJabatan, setDataJabatan] = useState({
    nama_jabatan: '' as string,
  });

  useEffect(() => {
    const fetchDataJabatanById = async () => {
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const res = await axios.get(
          `${process.env.API_URL}/api/master/jabatan/${id}`,
          { headers }
        );

        setDataJabatan(res?.data?.data);
      } catch (error) {
        console.log('Error: fetch data jabatan by id', error);
      }
    };

    fetchDataJabatanById();
  }, [cookies.accessToken, id]);

  const handleEditJabatan = async (
    values: z.infer<typeof validationSchema>
  ) => {
    try {
      const accessToken = cookies.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const res = await axios.put(
        `${process.env.API_URL}/api/master/jabatan/${id}`,
        values,
        { headers }
      );

      if (res.status === 200) {
        toast.success('Jabatan berhasil diedit!');
        router.refresh();
        router.push('/admin/master/jabatan');
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        console.log('error', error);
        toast.error('Jabatan sudah ada');
      } else {
        console.log('error', error);
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
        onSubmit={handleEditJabatan}
        resetValues={false}
        validationSchema={validationSchema}
        useFormProps={{
          values: {
            nama_jabatan: dataJabatan?.nama_jabatan,
          },
          mode: 'onChange',
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-3">
            <FormLayout register={register} errors={errors} />

            <div className="flex items-center justify-end gap-3">
              <Button type="submit" size="lg">
                Edit Jabatan
              </Button>
              <Link href="/admin/master/jabatan">
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
