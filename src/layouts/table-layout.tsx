'use client';

import Link from 'next/link';
import { Button } from 'rizzui';
import PageHeader, { PageHeaderTypes } from '@/shared/page-header';

type TableLayoutProps = {
  urlButton: string;
  buttonText?: string;
  iconText?: React.ReactNode;
  buttonExport?: string;
  variantExport?: string;
  iconExport?: React.ReactNode;
  handleExport?: () => void;
  data: unknown[];
  header?: string;
  fileName?: string;
  variant?: string;
} & PageHeaderTypes;

export default function TableLayout({
  urlButton,
  buttonText,
  data,
  header,
  iconText,
  iconExport,
  fileName,
  children,
  variant,
  buttonExport,
  variantExport,
  handleExport,
  ...props
}: React.PropsWithChildren<TableLayoutProps>) {
  return (
    <>
      <PageHeader {...props}>
        <div className="mt-4 flex items-center gap-3 @lg:mt-0">
          <Link href={urlButton} className="w-full @lg:w-auto">
            <Button
              as="span"
              className={`w-full @md:mt-0 @lg:w-auto ${variant}`}
            >
              {iconText}
              {buttonText}
            </Button>
          </Link>
          {buttonExport ? (
            <Button
              onClick={handleExport}
              className={`w-full @md:mt-0 @lg:w-auto ${variantExport}`}
            >
              {iconExport}
              {buttonExport}
            </Button>
          ) : null}
        </div>
      </PageHeader>

      {children}
    </>
  );
}
