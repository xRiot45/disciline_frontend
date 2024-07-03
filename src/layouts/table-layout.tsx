'use client';

import Link from 'next/link';
import { Button } from 'rizzui';
import PageHeader, { PageHeaderTypes } from '@/shared/page-header';

type TableLayoutProps = {
  urlButton: string;
  buttonText?: string;
  data: unknown[];
  header?: string;
  fileName?: string;
  variant?: string;
  icon?: React.ReactNode;
} & PageHeaderTypes;

export default function TableLayout({
  urlButton,
  buttonText,
  data,
  header,
  icon,
  fileName,
  children,
  variant,
  ...props
}: React.PropsWithChildren<TableLayoutProps>) {
  return (
    <>
      <PageHeader {...props}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link href={urlButton} className=" w-full  @lg:w-auto">
            <Button
              as="span"
              className={`w-full @md:mt-0 @lg:w-auto ${variant}`}
            >
              {icon}
              {buttonText}
            </Button>
          </Link>
        </div>
      </PageHeader>

      {children}
    </>
  );
}
