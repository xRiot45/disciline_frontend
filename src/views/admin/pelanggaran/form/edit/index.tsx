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
  title: 'Edit Pelanggaran Siswa',
  breadcrumb: [
    {
      href: '/admin/dashboard',
      name: 'Dashboard',
    },
    {
      href: '/admin/pelanggaran',
      name: 'Pelanggaran Siswa',
    },
    {
      name: 'Edit Pelanggaran Siswa',
    },
  ],
};

export default function EditPelanggaranView() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [cookies] = useCookies<string>(['accessToken']);
  const [dataPelanggaran, setDataPelanggaran] = useState({
    tipe_pelanggaran: {
      id: '',
    },
    siswa: {
      id: '',
    },
    keterangan: '',
  });

  useEffect(() => {
    const fetchPelanggaranDataById = async () => {
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const res = await axios.get(
          `${process.env.API_URL}/api/pelanggaran/${id}`,
          {
            headers,
          }
        );

        setDataPelanggaran(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPelanggaranDataById();
  }, [cookies.accessToken, id]);

  const handleEditPelanggaran = async (
    values: z.infer<typeof validationSchema>
  ) => {
    try {
      const accessToken = cookies.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const res = await axios.patch(
        `${process.env.API_URL}/api/pelanggaran/${id}`,
        values,
        { headers }
      );

      if (res.status === 200) {
        toast.success('Pelanggaran berhasil diedit!');
        router.refresh();
        router.push('/admin/pelanggaran');
      }
    } catch (error) {
      console.log(error);
      toast.error('Terjadi kesalahan saat mengubah data, silahkan coba lagi!');
    }
  };

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <Form<ValidationSchema>
        onSubmit={handleEditPelanggaran}
        validationSchema={validationSchema}
        useFormProps={{
          values: {
            tipePelanggaranId: dataPelanggaran?.tipe_pelanggaran?.id,
            siswaId: dataPelanggaran?.siswa?.id,
            keterangan: dataPelanggaran?.keterangan,
          },
          mode: 'onChange',
        }}
      >
        {({ register, control, formState: { errors } }) => (
          <div className="space-y-3">
            <FormLayout control={control} register={register} errors={errors} />

            <div className="flex items-center justify-end gap-3">
              <Button type="submit" size="lg">
                Edit Pelanggaran
              </Button>
              <Link href="/admin/pelanggaran">
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
