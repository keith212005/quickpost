'use client';

import Link from 'next/link';
import { Button } from '../ui/button';
import { useTheme } from 'next-themes';

export default function Sidebar() {

    const {setTheme} = useTheme();
  return (
    <aside className="h-screen w-60 bg-gray-100 px-4 py-6 border-r hidden md:block">
      <nav className="flex flex-col space-y-4">

      <Button 
      className='text-black dark:text-white bg-amber-400' 
      onClick={() => setTheme('dark')} variant={'link'}
      >
        
        
        Click me</Button>
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