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
  title: 'Edit Kelas',
  breadcrumb: [
    {
      href: '/admin/dashboard',
      name: 'Dashboard',
    },
    {
      href: '/admin/kelas',
      name: 'Kelas',
    },
    {
      name: 'Edit Kelas',
    },
  ],
};

export default function EditKelasView() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [cookies] = useCookies<string>(['accessToken']);
  const [dataKelas, setDataKelas] = useState({
    nama_kelas: '',
    jurusan: {
      id: '',
    },
    guru: {
      id: '',
    },
  });

  useEffect(() => {
    const fetchKelasDataById = async () => {
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const res = await axios.get(`${process.env.API_URL}/api/kelas/${id}`, {
          headers,
        });

        setDataKelas(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchKelasDataById();
  }, [cookies.accessToken, id]);

  const handleEditKelas = async (values: z.infer<typeof validationSchema>) => {
    try {
      const accessToken = cookies.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const res = await axios.patch(
        `${process.env.API_URL}/api/kelas/${id}`,
        values,
        { headers }
      );

      if (res.status === 200) {
        toast.success('Kelas berhasil diedit!');
        router.refresh();
        router.push('/admin/kelas');
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        toast.error('Kelas sudah ada');
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
        onSubmit={handleEditKelas}
        validationSchema={validationSchema}
        useFormProps={{
          values: {
            nama_kelas: dataKelas?.nama_kelas,
            jurusanId: dataKelas?.jurusan?.id,
            guruId: dataKelas?.guru?.id,
          },
          mode: 'onChange',
        }}
      >
        {({ register, control, formState: { errors } }) => (
          <div className="space-y-3">
            <FormLayout control={control} register={register} errors={errors} />

            <div className="flex items-center justify-end gap-3">
              <Button type="submit" size="lg">
                Edit Kelas
              </Button>
              <Link href="/admin/kelas">
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
