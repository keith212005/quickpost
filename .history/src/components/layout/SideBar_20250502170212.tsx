'use client';

import { Home, Moon, Settings, Sun, User } from 'lucide-react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Button } from '../ui/button';

export default function Sidebar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <aside className='hidden h-screen w-64 flex-col border-r bg-black px-6 py-8 shadow-lg md:flex dark:bg-black'>
      <div className='mb-10'>
        <h1 className='text-2xl font-extrabold text-blue-700'>QuickPost</h1>
        <span className='text-sm text-gray-500'>v1.0</span>
      </div>
      <nav className='flex flex-col space-y-3 text-[15px] font-medium text-gray-800'>
        <Link
          href='/dashboard'
          className='flex items-center gap-3 rounded-lg px-4 py-2 transition hover:bg-blue-50'
        >
          <Home className='h-5 w-5' />
          Feed
        </Link>
        <Link
          href='/profile'
          className='flex items-center gap-3 rounded-lg px-4 py-2 transition hover:bg-blue-50'
        >
          <User className='h-5 w-5' />
          My Posts
        </Link>
        <Link
          href='/settings'
          className='flex items-center gap-3 rounded-lg px-4 py-2 transition hover:bg-blue-50'
        >
          <Settings className='h-5 w-5' />
          Settings
        </Link>
        {mounted && (
          <Button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className='flex w-fit items-center gap-2 rounded-lg px-4 py-2 transition hover:bg-blue-50'
            variant='ghost'
          >
            {theme === 'dark' ? (
              <Sun className='h-4 w-4' />
            ) : (
              <Moon className='h-4 w-4' />
            )}
            Toggle Theme
          </Button>
        )}
      </nav>
    </aside>
  );
}
