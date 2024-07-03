'use client';

import cn from '@/utils/class-names';
import Image from 'next/image';
import axios from 'axios';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import { UserData } from '@/types/auth';
import { useCookies } from 'react-cookie';
import { decodeToken } from '@/utils/auth';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Title, Text, Button, Popover } from 'rizzui';
import Link from 'next/link';

export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
  username = false,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
  username?: boolean;
}) {
  return (
    <ProfileMenuPopover>
      <Popover.Trigger>
        <button
          className={cn(
            'w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10',
            buttonClassName
          )}
        >
          <Image
            src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
            alt="User image"
            width={40}
            height={40}
            className={cn(
              'aspect-square !h-9 w-9 overflow-hidden rounded-full bg-[#ab46d2] sm:!h-10 sm:!w-10',
              avatarClassName
            )}
          />
          {!!username && (
            <span className="username hidden text-gray-200 dark:text-gray-700 md:inline-flex">
              Hi, Andry
            </span>
          )}
        </button>
      </Popover.Trigger>

      <Popover.Content className="z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
        <DropdownMenu />
      </Popover.Content>
    </ProfileMenuPopover>
  );
}

function ProfileMenuPopover({ children }: React.PropsWithChildren<{}>) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement="bottom-end"
    >
      {children}
    </Popover>
  );
}

function DropdownMenu() {
  const router = useRouter();
  const [cookies] = useCookies(['accessToken']);

  const accessToken = cookies.accessToken;
  const userData: UserData | null = decodeToken(accessToken);

  // Handle sign out
  const handleSignOut = async () => {
    try {
      const accessToken = cookies.accessToken;
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      const res = await axios.delete(
        `${process.env.API_URL}/api/users/signout`,
        { headers }
      );

      if (res.status === 200) {
        Cookies.remove('accessToken');
        toast.success('Berhasil logout!');
        router.push('/');
      }
    } catch (error) {
      console.log(error);
      toast.error('Terjadi kesalahan saat logout, silahkan coba lagi!');
    }
  };

  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Image
          src="https://isomorphic-furyroad.s3.amazonaws.com/public/avatars/avatar-11.webp"
          alt="User image"
          width={40}
          height={40}
          className="aspect-square !h-9 w-9 overflow-hidden rounded-full bg-[#ab46d2] sm:!h-10 sm:!w-10"
        />
        <div className="ms-3">
          <Title as="h6" className="font-semibold">
            {userData ? userData.username : ''}
          </Title>
          <Text className="text-green-600">
            {userData ? userData.role : ''}
          </Text>
        </div>
      </div>
      <div className="border-t border-gray-300 px-6 pb-6 pt-5">
        <Link href="/admin/profile/update-password">
          <Button
            className="mb-4 h-auto w-full justify-start p-0 font-medium  outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
            variant="text"
          >
            Update Password
          </Button>
        </Link>
        <Button
          className="h-auto w-full justify-start p-0 font-medium text-red-600 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          onClick={handleSignOut}
        >
          Keluar
        </Button>
      </div>
    </div>
  );
}
