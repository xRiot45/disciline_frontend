'use client';

import cn from '@/utils/class-names';
import Image from 'next/image';
import Link from 'next/link';
import logoDarkImg from '../../../public/images/logo_dark.png';
import { Title } from 'rizzui';

export default function AuthWrapper({
  children,
  title,
  className = '',
}: {
  children: React.ReactNode;
  title: React.ReactNode;
  isSocialLoginActive?: boolean;
  isSignIn?: boolean;
  className?: string;
}) {
  return (
    <>
      <div className="relative flex min-h-screen w-full flex-col justify-center bg-gradient-to-r from-gray-700 to-gray-950 p-4 md:p-12 lg:p-28">
        <div
          className={cn(
            'mx-auto w-full max-w-md rounded-xl bg-white px-4 py-9 dark:bg-gray-50 sm:px-6 md:max-w-xl md:px-10 md:py-12 lg:max-w-[700px] lg:px-16 xl:rounded-2xl 3xl:rounded-3xl',
            className
          )}
        >
          <div className="flex flex-col items-center">
            <Link href={'/'} className="mb-6 inline-block ">
              <Image src={logoDarkImg} alt="logo" width={80} height={80} />
            </Link>
            <Title
              as="h2"
              className="mb-7 text-center text-[26px] leading-snug md:text-3xl md:!leading-normal lg:mb-10 lg:text-4xl lg:leading-normal"
            >
              {title}
            </Title>
          </div>

          {children}
        </div>
      </div>
    </>
  );
}
