'use client';

import { usePathname, useRouter } from 'next/navigation';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ADMIN_DASHBOARD_TABS } from '@/constants/constants';

export const AdminDashboardTabs = () => {
  const pathname = usePathname();
  const router = useRouter();

  const currentTab =
    ADMIN_DASHBOARD_TABS.find((tab) => pathname.includes(tab.value))?.value ||
    'overview';

  const handleTabChange = (value: string) => {
    const tab = ADMIN_DASHBOARD_TABS.find((t) => t.value === value);
    if (tab) {
      router.push(tab.route);
    }
  };

  return (
    <Tabs
      defaultValue={currentTab}
      onValueChange={handleTabChange}
      className='mb-6'
    >
      <TabsList>
        {ADMIN_DASHBOARD_TABS.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value}>
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
};
