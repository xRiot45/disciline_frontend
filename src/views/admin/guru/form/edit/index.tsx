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
  title: 'Edit Guru',
  breadcrumb: [
    {
      href: '/admin/dashboard',
      name: 'Dashboard',
    },
    {
      href: '/admin/guru',
      name: 'Guru',
    },
    {
      name: 'Edit Guru',
    },
  ],
};

export default function EditGuruView() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [cookies] = useCookies<string>(['accessToken']);
  const [dataGuru, setDataGuru] = useState({
    nama_lengkap: '' as string,
    nip: '' as string,
    status: {
      id: '' as string,
    },
    jabatan: {
      id: '' as string,
    },
    golongan: {
      id: '' as string,
    },
    agama: {
      id: '' as string,
    },
    jenis_kelamin: '' as string,
    no_telp: '' as string,
    alamat: '' as string,
  });

  useEffect(() => {
    const fetchDataGuruById = async () => {
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const res = await axios.get(`${process.env.API_URL}/api/guru/${id}`, {
          headers,
        });

        setDataGuru(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataGuruById();
  }, [cookies.accessToken, id]);

  const handleEditGuru = async (values: z.infer<typeof validationSchema>) => {
    try {
      const accessToken = cookies.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const res = await axios.patch(
        `${process.env.API_URL}/api/guru/${id}`,
        values,
        { headers }
      );

      if (res.status === 200) {
        toast.success('Guru berhasil diedit!');
        router.refresh();
        router.push('/admin/guru');
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        toast.error('Guru sudah ada');
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
        onSubmit={handleEditGuru}
        validationSchema={validationSchema}
        useFormProps={{
          values: {
            nama_lengkap: dataGuru?.nama_lengkap,
            nip: dataGuru?.nip,
            statusId: dataGuru?.status?.id,
            jabatanId: dataGuru?.jabatan?.id,
            golonganId: dataGuru?.golongan?.id,
            agamaId: dataGuru?.agama?.id,
            jenis_kelamin: dataGuru?.jenis_kelamin,
            no_telp: dataGuru?.no_telp,
            alamat: dataGuru?.alamat,
          },
          mode: 'onChange',
        }}
      >
        {({ register, control, formState: { errors } }) => (
          <div className="space-y-3">
            <FormLayout control={control} register={register} errors={errors} />

            <div className="flex items-center justify-end gap-3">
              <Button type="submit" size="lg">
                Edit Guru
              </Button>
              <Link href="/admin/guru">
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
