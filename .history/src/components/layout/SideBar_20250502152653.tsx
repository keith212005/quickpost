'use client';

import { useTheme } from 'next-themes';

import { Button } from '../ui/button';

export default function Sidebar() {
  const { setTheme } = useTheme();
  return (
    <aside className='hidden h-screen w-60 border-r bg-gray-100 px-4 py-6 md:block'>
      <nav className='flex flex-col space-y-4'>
        <Button
          className='bg-amber-400 text-black dark:text-white'
          onClick={() => setTheme('dark')}
          variant={'link'}
        >
          Click me
        </Button>
        {/* <Link href="/dashboard" className="hover:text-blue-500">
          Home
        </Link>
        <Link href="/profile" className="hover:text-blue-500">
          My Posts
        </Link>
        <Link href="/settings" className="hover:text-blue-500">
          Settings
        </Link> */}
      </nav>
    </aside>
  );
}
