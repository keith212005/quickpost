import { getServerSession } from 'next-auth';

import AdminSideBar from '@/components/layout/AdminSideBar';
import SideBar from '@/components/layout/SideBar';

import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <>
      <div className='flex'>
        {session?.user?.role === 'admin' ? <AdminSideBar /> : <SideBar />}
        <main className='flex-1'>{children}</main>
      </div>
    </>
  );
}
