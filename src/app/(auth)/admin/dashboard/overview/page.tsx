import { Activity, FileText, Users } from 'lucide-react';

import { getDashboardStats } from '@/app/actions/getDashboardStats';
import { DashboardErrorToast } from '@/components/DashboardErrorToast';
import PostsChart from '@/components/PostsChart';
import { StatCard } from '@/components/StatCard';
import TopUsersChart from '@/components/TopUsersChart';

const AdminDashboardOverview = async () => {
  const { totalPosts, totalUsers, postsThisMonth, activeUsers, error } =
    await getDashboardStats();

  return (
    <div className='bg-background text-foreground min-h-screen px-4 py-6'>
      <DashboardErrorToast error={error} />

      <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Total Users'
          value={totalUsers}
          icon={Users}
          variant='default'
        />
        <StatCard
          title='Posts This Week'
          value={totalPosts}
          icon={FileText}
          variant='success'
        />
        <StatCard
          title='Posts This Month'
          value={postsThisMonth}
          icon={FileText}
          variant='danger'
        />
        <StatCard
          title='Active Users'
          value={activeUsers}
          icon={Activity}
          variant='info'
        />
      </div>

      <div className='mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <PostsChart />
        <TopUsersChart />
      </div>
    </div>
  );
};

export default AdminDashboardOverview;
