import { auth } from '@/auth';
import AdminSideBar from '@/components/layout/AdminSideBar';
import Sidebar from '@/components/layout/SideBar';

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  console.log('session in AuthLayout  >>>>>', session?.user);

  return (
    <div className='flex'>
      {session?.user?.role === 'user' ? <Sidebar /> : <AdminSideBar />}
      <main className='flex-1'>{children}</main>
    </div>
  );
}
