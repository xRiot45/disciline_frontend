'use client';

import { LAYOUT_OPTIONS } from '@/config/enums';
import { useLayout } from '@/hooks/use-layout';
import HydrogenLayout from '@/layouts/hydrogen/layout';
import HeliumLayout from '@/layouts/helium/helium-layout';
import BerylLiumLayout from '@/layouts/beryllium/beryllium-layout';

import { useIsMounted } from '@/hooks/use-is-mounted';
import LithiumLayout from '@/layouts/lithium/lithium-layout';
import CarbonLayout from '@/layouts/carbon/carbon-layout';
import BoronLayout from '@/layouts/boron/boron-layout';

type LayoutProps = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: LayoutProps) {
  return <LayoutProvider>{children}</LayoutProvider>;
}

function LayoutProvider({ children }: LayoutProps) {
  const { layout } = useLayout();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }

  return <HeliumLayout>{children}</HeliumLayout>;
}
