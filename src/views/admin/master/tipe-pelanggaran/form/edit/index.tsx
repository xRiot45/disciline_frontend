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
  title: 'Tipe Pelanggaran',
  breadcrumb: [
    {
      href: '/admin/dashboard',
      name: 'Dashboard',
    },
    {
      href: '/admin/master/tipe-pelanggaran',
      name: 'Tipe Pelanggaran',
    },
    {
      name: 'Edit Tipe Pelanggaran',
    },
  ],
};

export default function EditTipePelanggaranView() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [cookies] = useCookies(['accessToken']);
  const [namaTipePelanggaran, setNamaTipePelanggaran] = useState<string | any>(
    ''
  );

  useEffect(() => {
    const fetchDataById = async () => {
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const res = await axios.get(
          `${process.env.API_URL}/api/master/tipe-pelanggaran/${id}`,
          { headers }
        );
        setNamaTipePelanggaran(res?.data?.data);
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
        `${process.env.API_URL}/api/master/tipe-pelanggaran/${id}`,
        values,
        { headers }
      );

      if (res.status === 200) {
        toast.success('Tipe pelanggaran berhasil diedit!');
        router.refresh();
        router.push('/admin/master/tipe-pelanggaran');
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        toast.error('Tipe pelanggaran sudah ada');
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
            nama_tipe_pelanggaran: namaTipePelanggaran?.nama_tipe_pelanggaran,
          },
          mode: 'onChange',
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-3">
            <FormLayout register={register} errors={errors} />

            <div className="flex items-center justify-end gap-3">
              <Button type="submit" size="lg">
                Edit Tipe Pelanggaran
              </Button>
              <Link href="/admin/master/tipe-pelanggaran">
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
