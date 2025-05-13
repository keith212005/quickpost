'use client';

import Image from 'next/image';
import { useSession } from 'next-auth/react';

import { ToggleThemeButton } from '../ToggleThemeButton';
import NavLink from '../ui/NavLink';
import { UserAvatar } from '../UserAvatar';

export default function Navbar() {
  const { data: session, status } = useSession();

  console.log('Session in nav:>>>>>>>>>>>', session, status);

  if (status === 'loading') return null;

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
        <nav className='flex items-center gap-6'>
          {session?.user && (
            <div className='flex items-center gap-3'>
              <span className='text-sm font-medium text-gray-700 hover:underline dark:text-white'>
                Welcome, {session.user.firstName}
              </span>
              <UserAvatar />
            </div>
          )}
          {!session?.user && <NavLink href='/signin' label='Sign In' />}
          <ToggleThemeButton />
        </nav>
      </div>
    </header>
  );
}
