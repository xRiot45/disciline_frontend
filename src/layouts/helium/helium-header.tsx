'use client';

import Sidebar from './helium-sidebar';
import ProfileMenu from '@/layouts/profile-menu';
import SettingsButton from '@/components/settings/settings-button';
import HamburgerButton from '@/layouts/hamburger-button';
import { PiGearFill } from 'react-icons/pi';

function HeaderMenuRight() {
  return (
    <div className="ms-auto flex justify-end gap-5">
      <SettingsButton className="rounded-full before:absolute before:h-full before:w-full before:-rotate-45 before:rounded-full before:bg-gradient-to-l before:from-green-dark/25 before:via-green-dark/0 before:to-green-dark/0 3xl:h-10 3xl:w-10">
        <PiGearFill className="h-[22px] w-auto animate-spin-slow" />
      </SettingsButton>
      <ProfileMenu />
    </div>
  );
}

export default function Header() {
  return (
    <header
      className={
        'sticky top-0 z-[990] flex items-center bg-gray-0/80 px-4 py-4 backdrop-blur-xl dark:bg-gray-50/50 md:px-5 lg:px-6 xl:-ms-1.5 xl:pl-4 2xl:-ms-0 2xl:py-5 2xl:pl-6 3xl:px-8 3xl:pl-6 4xl:px-10 4xl:pl-9'
      }
    >
      <div className="flex w-full max-w-2xl items-center">
        <HamburgerButton
          view={
            <Sidebar className="static w-full xl:p-0 2xl:w-full [&>div]:xl:rounded-none" />
          }
        />
      </div>
      <HeaderMenuRight />
    </header>
  );
}
