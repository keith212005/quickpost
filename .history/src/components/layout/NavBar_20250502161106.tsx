'use client';

import { Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className='w-full bg-yellow-700 shadow-md dark:bg-white'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
        <div className='flex items-center space-x-3'>
          <Image src='/quick-post-logo.png' alt='logo' width={60} height={60} />
          <Link href='/' className='text-xl font-bold text-blue-600'>
            QuickPost
          </Link>
        </div>
        <nav className='flex items-center gap-4'>
          <Link href='/dashboard'>Feed</Link>
          <Link href='/profile'>Profile</Link>
          <Link href='/admin' className='font-semibold text-red-500'>
            Admin
          </Link>
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className='ml-4 rounded p-2 transition-colors hover:bg-gray-100 dark:hover:bg-gray-700'
              aria-label='Toggle Theme'
            >
              {theme === 'dark' ? (
                <Sun className='h-5 w-5 hover:text-white dark:text-black' />
              ) : (
                <Moon className='h-5 w-5' />
              )}
            </button>
          )}
        </nav>
      </div>
    </header>
  );
}
