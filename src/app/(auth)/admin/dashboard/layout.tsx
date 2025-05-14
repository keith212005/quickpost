// app/(auth)/admin/dashboard/layout.tsx
import { ReactNode } from 'react';

import { AdminDashboardTabs } from '@/components/AdminDashboardTabs';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className='bg-background text-foreground min-h-screen px-4 py-6'>
      <h1 className='mb-6 text-3xl font-bold'>Dashboard</h1>
      <AdminDashboardTabs />
      <div className='mt-6'>{children}</div>
    </div>
  );
}
