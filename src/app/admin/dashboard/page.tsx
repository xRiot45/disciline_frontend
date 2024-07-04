import { metaObject } from '@/config/site.config';
import DashboardView from '@/views/admin/dashboard';

export const metadata = {
  ...metaObject('Dashboard'),
};

export default function DashboardPage() {
  return (
    <>
      <DashboardView />
    </>
  );
}
