import { Toaster } from 'react-hot-toast';
import GlobalDrawer from '@/shared/drawer-views/container';
import GlobalModal from '@/shared/modal-views/container';
import { ThemeProvider } from '@/shared/theme-provider';
import { siteConfig } from '@/config/site.config';
import { inter, lexendDeca } from '@/styles/fonts';
import cn from '@/utils/class-names';
import NextProgress from '@/components/next-progress';

// styles
import '@/styles/globals.css';

export const metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const session = await getServerSession(authOptions);
  return (
    <html
      lang="en"
      dir="ltr"
      // required this one for next-themes, remove it if you are not using next-theme
      suppressHydrationWarning
    >
      <body
        // to prevent any warning that is caused by third party extensions like Grammarly
        suppressHydrationWarning
        className={cn(inter.variable, lexendDeca.variable, 'font-inter')}
      >
        <ThemeProvider>
          <NextProgress />
          {children}
          <Toaster />
          <GlobalDrawer />
          <GlobalModal />
        </ThemeProvider>
      </body>
    </html>
  );
}
