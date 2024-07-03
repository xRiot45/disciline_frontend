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
  title: 'Edit Status',
  breadcrumb: [
    {
      href: '/admin/dashboard',
      name: 'Dashboard',
    },
    {
      href: '/admin/master/status',
      name: 'Status',
    },
    {
      name: 'Edit Status',
    },
  ],
};

export default function EditStatusView() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [cookies] = useCookies<string>(['accessToken']);
  const [dataStatus, setDataStatus] = useState({
    nama_status: '' as string,
  });

  useEffect(() => {
    const fetchDataStatusById = async () => {
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const res = await axios.get(
          `${process.env.API_URL}/api/master/status/${id}`,
          { headers }
        );
        setDataStatus(res?.data?.data);
      } catch (error) {
        console.log('Error: fetch data status by id', error);
      }
    };

    fetchDataStatusById();
  }, [cookies.accessToken, id]);

  const handleEditStatus = async (values: z.infer<typeof validationSchema>) => {
    try {
      const accessToken = cookies.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const res = await axios.put(
        `${process.env.API_URL}/api/master/status/${id}`,
        values,
        { headers }
      );

      if (res.status === 200) {
        toast.success('Status berhasil diedit!');
        router.refresh();
        router.push('/admin/master/status');
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        console.log('error: ', error);
        toast.error('Status sudah ada');
      } else {
        console.log('error: ', error);
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
        onSubmit={handleEditStatus}
        resetValues={false}
        validationSchema={validationSchema}
        useFormProps={{
          values: {
            nama_status: dataStatus?.nama_status,
          },
          mode: 'onChange',
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-3">
            <FormLayout register={register} errors={errors} />

            <div className="flex items-center justify-end gap-3">
              <Button type="submit" size="lg">
                Edit status
              </Button>
              <Link href="/admin/master/status">
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
