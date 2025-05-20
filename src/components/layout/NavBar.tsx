'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useMediaQuery } from 'usehooks-ts';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { AdminResponsiveSidebar } from '../AdminResponsiveSidebar';
import { ToggleThemeButton } from '../ToggleThemeButton';
import NavLink from '../ui/NavLink';
import { UserAvatar } from '../UserAvatar';
import { UserResponsiveSidebar } from '../UserResponsiveSidebar';

export default function Navbar() {
  const { data: session, status } = useSession();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (status === 'loading') return null;

  const isLoggedIn = !!session?.user?.isActive;
  const isAdmin = session?.user?.role === 'admin';

  const renderLogo = (
    <Image
      src='/quick-post-logo.png'
      alt='logo'
      width={60}
      height={60}
      className='rounded-full'
    />
  );

  return (
    <header className='w-full bg-white shadow-md dark:bg-black'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
        {isMobile ? (
          <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
            <DropdownMenuTrigger asChild>{renderLogo}</DropdownMenuTrigger>
            <DropdownMenuContent
              className='w-64 border border-gray-200 bg-white p-4 shadow-lg dark:border-zinc-800 dark:bg-black'
              align='start'
              sideOffset={8}
            >
              {isAdmin ? (
                <AdminResponsiveSidebar
                  onItemSelect={() => setDropdownOpen(false)}
                />
              ) : (
                <UserResponsiveSidebar
                  onItemSelect={() => setDropdownOpen(false)}
                />
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className='flex items-center space-x-3'>
            {renderLogo}
            <NavLink href='/' label='QuickPost' />
          </div>
        )}

        <nav className='flex items-center gap-6'>
          {isLoggedIn && !isMobile && (
            <span className='text-sm font-medium text-gray-700 hover:underline dark:text-white'>
              Welcome, {session.user.firstName}
            </span>
          )}

          {isLoggedIn && <UserAvatar />}
          {!isLoggedIn && <NavLink href='/signin' label='Sign In' />}
          <ToggleThemeButton />
        </nav>
      </div>
    </header>
  );
}
