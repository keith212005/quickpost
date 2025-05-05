import NavBar from '@/components/layout/NavBar';
import SideBar from '@/components/layout/SideBar';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavBar />
      <div className='flex'>
        <SideBar />
        <main className='flex-1'>{children}</main>
      </div>
    </>
  );
}
