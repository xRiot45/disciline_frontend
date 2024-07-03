import { Metadata } from 'next';
import logoImg from '@public/logo.svg';
import { LAYOUT_OPTIONS } from '@/config/enums';
import logoIconImg from '@public/logo-short.svg';
import { OpenGraph } from 'next/dist/lib/metadata/types/opengraph-types';

enum MODE {
  DARK = 'dark',
  LIGHT = 'light',
}

export const siteConfig = {
  title: 'Disciline',
  description: `-`,
  logo: logoImg,
  icon: logoIconImg,
  mode: MODE.LIGHT,
  layout: LAYOUT_OPTIONS.HYDROGEN,
};

export const metaObject = (
  title?: string,
  openGraph?: OpenGraph,
  description: string = siteConfig.description
): Metadata => {
  return {
    title: title ? `${title} - Disciline` : siteConfig.title,
    description,
    openGraph: openGraph ?? {
      title: title ? `${title} - Disciline` : title,
      description,
      url: '#',
      siteName: '#',
      images: {
        url: '#',
        width: 1200,
        height: 630,
      },
      locale: 'en_US',
      type: 'website',
    },
  };
};
