'use client';

import { Moon, Sun } from 'lucide-react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { useThemeToggle } from '@/hooks/useThemeToggle';

import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import NavLink from '../ui/NavLink';

export default function Navbar() {
  const { mounted, theme, toggleTheme } = useThemeToggle();
  const { data } = useSession();

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
            onClick={toggleTheme}
            className='ml-4 rounded p-2 transition-colors hover:bg-gray-200 dark:hover:bg-gray-400'
            aria-label='Toggle Theme'
          >
            {mounted ? (
              theme === 'dark' ? (
                <Sun className='h-5 w-5 text-white' />
              ) : (
                <Moon className='h-5 w-5 text-black' />
              )
            ) : (
              <Moon className='h-5 w-5 text-black' />
            )}
          </button>

          <Avatar>
            <AvatarImage src={sess} alt='@shadcn' />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </nav>
      </div>
    </header>
  );
}
