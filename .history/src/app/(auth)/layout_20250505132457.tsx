import SideBar from '@/components/layout/SideBar';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='flex'>
        <SideBar />
        <main className='flex-1'>{children}</main>
      </div>
    </>
  );
}
