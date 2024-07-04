'use client';

import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
import { z } from 'zod';
import { Form } from '@/components/ui/form';
import { useState } from 'react';
import { useMedia } from '@/hooks/use-media';
import { useRouter } from 'next/navigation';
import { validationSchema } from './validationSchema';
import { Input, Button, Password } from 'rizzui';

export default function FormLayout() {
  const router = useRouter();
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSignIn = async (values: z.infer<typeof validationSchema>) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.API_URL}/api/users/signin`,
        values
      );
      if (res.status === 201) {
        const { accessToken } = res?.data?.data;
        Cookies.set('accessToken', accessToken, {
          expires: 1,
        });
        toast.success('Berhasil login!');
        router.refresh();
        router.push('/admin/dashboard');
      }
    } catch (error) {
      console.log(error);
      toast.error('Username atau password salah!');
      setIsLoading(false);
    }
  };

  return (
    <>
      <Form
        validationSchema={validationSchema}
        onSubmit={handleSignIn}
        useFormProps={{
          mode: 'onChange',
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5 lg:space-y-6">
            <Input
              type="text"
              size={isMedium ? 'lg' : 'xl'}
              label="Username"
              placeholder="Masukkan Username Anda..."
              className="[&>label>span]:font-medium"
              {...register('username')}
              error={errors.username?.message}
            />
            <Password
              label="Password"
              placeholder="Masukkan Password Anda..."
              size={isMedium ? 'lg' : 'xl'}
              className="[&>label>span]:font-medium"
              {...register('password')}
              error={errors.password?.message}
            />

            {isLoading ? (
              <Button
                type="submit"
                size={isMedium ? 'lg' : 'xl'}
                className="w-full bg-gray-950 text-white disabled:opacity-50"
                disabled
              >
                Loading...
              </Button>
            ) : (
              <Button
                type="submit"
                size={isMedium ? 'lg' : 'xl'}
                className="w-full bg-gray-950 text-white"
              >
                Login
              </Button>
            )}
          </div>
        )}
      </Form>
    </>
  );
}
