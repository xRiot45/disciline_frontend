import Link from 'next/link';
import Image from 'next/image';
import IconImg from '../../public/images/icon.png';
import SocialItems from '@/components/ui/social-shares';
import { MdLogin } from 'react-icons/md';
import { Button, Title, Text } from 'rizzui';
import { metaObject } from '@/config/site.config';

export const metadata = {
  ...metaObject('Beranda'),
};

export default function WelcomePage() {
  return (
    <>
      <div className="flex grow items-center px-6 xl:px-10">
        <div className="mx-auto flex w-full max-w-[1180px] flex-col-reverse items-center justify-between text-center lg:flex-row lg:gap-5 lg:text-start 3xl:max-w-[1520px]">
          <div>
            <Title
              as="h2"
              className="mb-3 text-[22px] font-bold leading-snug sm:text-2xl md:mb-5 md:text-3xl md:leading-snug xl:mb-7 xl:text-4xl xl:leading-normal 2xl:text-[40px] 3xl:text-5xl 3xl:leading-snug"
            >
              Selamat datang di Disciline
            </Title>
            <Text className="mb-6 max-w-[612px] text-sm leading-loose text-gray-500 md:mb-8 xl:mb-10 xl:text-base xl:leading-loose">
              Disciline adalah Sistem Informasi Pelanggaran Siswa (SIPS) yang
              bertujuan untuk mencatat, mengelola, dan melaporkan pelanggaran
              yang dilakukan siswa di lingkungan sekolah.
            </Text>
            <div className="mt-8 flex flex-col justify-center gap-4 lg:flex-row lg:justify-start xl:gap-6">
              <Link href="/auth/signin">
                <Button
                  color="primary"
                  size="lg"
                  className="h-12 w-full px-4 xl:h-14 xl:px-6"
                >
                  <MdLogin className="me-1.5 h-[17px] w-[17px] text-white" />
                  Login Admin
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative">
            <Image
              src={IconImg}
              alt="Late Img"
              className="aspect-[632/630] max-w-[256px] sm:max-w-xs lg:max-w-lg 2xl:max-w-xl 3xl:max-w-[632px]"
            />
          </div>
        </div>
      </div>
      <SocialItems />
    </>
  );
}
