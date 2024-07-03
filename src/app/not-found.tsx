import Link from 'next/link';
import Image from 'next/image';
import { Title, Button } from 'rizzui';
import { PiHouseLineBold } from 'react-icons/pi';
import SocialItems from '@/components/ui/social-shares';
import { siteConfig } from '@/config/site.config';
import NotFoundImg from '../../public/images/not-found.png';
import LogoDarkImg from '../../public/images/logo_dark.png';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-[#F8FAFC]">
      <div className="sticky top-0 z-40 flex justify-center py-5 backdrop-blur-lg lg:backdrop-blur-none xl:py-10">
        <Link href="/">
          <Image
            src={LogoDarkImg}
            alt={siteConfig.title}
            className="dark:invert"
            priority
            width={60}
            height={60}
          />
        </Link>
      </div>

      <div className="flex grow items-center px-6 xl:px-10">
        <div className="mx-auto text-center">
          <Image
            src={NotFoundImg}
            alt="not found"
            className="mx-auto mb-8 aspect-[360/326] max-w-[256px] xs:max-w-[370px] lg:mb-12 2xl:mb-16"
          />
          <Title
            as="h1"
            className="text-[22px] font-bold leading-normal text-gray-1000 lg:text-3xl"
          >
            Maaf, Halaman Tidak Ditemukan
          </Title>
          <p className="mt-3 text-sm leading-loose text-gray-500 lg:mt-6 lg:text-base lg:leading-loose">
            Halaman yang Anda cari mungkin telah dihapus atau tidak tersedia.
            <br className="hidden sm:inline-block" />
            Silakan kembali ke halaman sebelumnya atau kembali ke halaman utama.
          </p>
          <Link href={'/'}>
            <Button
              as="span"
              size="xl"
              color="primary"
              className="mt-8 h-12 px-4 xl:h-14 xl:px-6"
            >
              <PiHouseLineBold className="mr-1.5 text-lg" />
              Kembali Ke Beranda
            </Button>
          </Link>
        </div>
      </div>
      <SocialItems />
    </div>
  );
}
