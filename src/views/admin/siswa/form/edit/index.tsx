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
  title: 'Edit Siswa',
  breadcrumb: [
    {
      href: '/admin/dashboard',
      name: 'Dashboard',
    },
    {
      href: '/admin/siswa',
      name: 'Siswa',
    },
    {
      name: 'Edit Siswa',
    },
  ],
};

export default function EditSiswaView() {
  const router = useRouter();
  const pathname = usePathname();
  const id = pathname.split('/').pop();
  const [cookies] = useCookies<string>(['accessToken']);
  const [dataSiswa, setDataSiswa] = useState({
    nama_lengkap: '' as string,
    nis: '' as string,
    nisn: '' as string,
    tanggal_lahir: new Date() as Date,
    tempat_lahir: '',
    jenis_kelamin: '',
    agama: {
      id: '',
    },

    kelas: {
      id: '',
    },
    nama_wali: '',
    no_telp_wali: '',
    alamat: '',
  });

  useEffect(() => {
    const fetchDataById = async () => {
      try {
        const accessToken = cookies.accessToken;
        const headers = {
          Authorization: `Bearer ${accessToken}`,
        };

        const res = await axios.get(`${process.env.API_URL}/api/siswa/${id}`, {
          headers,
        });

        setDataSiswa(res?.data?.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchDataById();
  }, [cookies.accessToken, id]);

  const handleEditSiswa = async (values: z.infer<typeof validationSchema>) => {
    try {
      const accessToken = cookies.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const res = await axios.patch(
        `${process.env.API_URL}/api/siswa/${id}`,
        values,
        { headers }
      );

      if (res.status === 200) {
        toast.success('Siswa berhasil diedit!');
        router.refresh();
        router.push('/admin/siswa');
      }
    } catch (error: any) {
      if (error.response.status === 409) {
        toast.error('Siswa sudah ada');
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
        onSubmit={handleEditSiswa}
        resetValues={false}
        validationSchema={validationSchema}
        useFormProps={{
          values: {
            nama_lengkap: dataSiswa?.nama_lengkap,
            nis: dataSiswa?.nis,
            nisn: dataSiswa?.nisn,
            tanggal_lahir: dataSiswa?.tanggal_lahir
              ? new Date(dataSiswa.tanggal_lahir)
              : dataSiswa?.tanggal_lahir,
            tempat_lahir: dataSiswa?.tempat_lahir,
            jenis_kelamin: dataSiswa?.jenis_kelamin,
            agamaId: dataSiswa?.agama?.id,
            kelasId: dataSiswa?.kelas?.id,
            nama_wali: dataSiswa?.nama_wali,
            no_telp_wali: dataSiswa?.no_telp_wali,
            alamat: dataSiswa?.alamat,
          },
          mode: 'onChange',
        }}
      >
        {({ register, control, formState: { errors } }) => (
          <div className="space-y-3">
            <FormLayout control={control} register={register} errors={errors} />

            <div className="flex items-center justify-end gap-3">
              <Button type="submit" size="lg">
                Edit Siswa
              </Button>
              <Link href="/admin/siswa">
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
