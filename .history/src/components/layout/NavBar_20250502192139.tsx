'use client';

import { Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import { useTheme } from 'next-themes';

import NavLink from '../ui/NavLink';

export default function Navbar() {
  const { theme, setTheme } = useTheme();

  return (
    <header className='w-full bg-white shadow-md dark:bg-black'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
        <div className='flex items-center space-x-3'>
          <Image
            src='/quick-post-logo.png'
            alt='logo'
            width={60}
            height={60}
            className='rounded-full'
          />
          <NavLink href='/' label='QuickPost' />
        </div>
        <nav className='flex items-center gap-4'>
          <NavLink href='/dashboard' label='Feed' />
          <NavLink href='/profile' label='Profile' />
          <NavLink href='/admin' label='Admin' />
          <NavLink href='/login' label='Login' />

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className='ml-4 rounded p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-400'
            aria-label='Toggle Theme'
          >
            {theme === 'dark' ? (
              <Sun className='h-5 w-5 dark:text-white' />
            ) : (
              <Moon className='h-5 w-5 text-black' />
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}
