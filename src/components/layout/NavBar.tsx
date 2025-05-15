'use client';

import { useEffect } from 'react';
import { Home, Menu, MessageSquareText, Settings, User } from 'lucide-react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useMediaQuery } from 'usehooks-ts';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import { SignOutButton } from '../SingoutButton';
import { ToggleThemeButton } from '../ToggleThemeButton';
import NavLink from '../ui/NavLink';
import { SideBarLink } from '../ui/SideBarLink';
import ThemedIcon from '../ui/ThemedIcon';
import { UserAvatar } from '../UserAvatar';

export default function Navbar() {
  const { data: session, status } = useSession();

  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    // No sidebarOpen state to reset
  }, [isMobile]);

  if (status === 'loading') return null;

  return (
    <>
      <header className='w-full bg-white shadow-md dark:bg-black'>
        <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
          {isMobile && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button>
                  <Menu className='h-6 w-6 text-gray-700 dark:text-white' />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className='w-64 border border-gray-200 bg-white p-4 shadow-lg dark:border-zinc-800 dark:bg-black'
                align='start'
                sideOffset={8}
              >
                {session?.user.role === 'admin' ? (
                  <>
                    <SideBarLink
                      href='/admin/dashboard/overview'
                      label='Dashboard'
                    >
                      <ThemedIcon Icon={Home} />
                    </SideBarLink>

                    <SideBarLink href='/admin/users' label='Users'>
                      <ThemedIcon Icon={User} />
                    </SideBarLink>

                    <SideBarLink href='/admin/posts' label='All Posts'>
                      <ThemedIcon Icon={MessageSquareText} />
                    </SideBarLink>

                    <SideBarLink href='/settings' label='Settings'>
                      <ThemedIcon Icon={Settings} />
                    </SideBarLink>

                    <SignOutButton />
                  </>
                ) : (
                  <>
                    <SideBarLink href='/user/feed' label='Feed'>
                      <ThemedIcon Icon={Home} />
                    </SideBarLink>
                    <SideBarLink href='/user/myposts' label='My Posts'>
                      <ThemedIcon Icon={MessageSquareText} />
                    </SideBarLink>
                    <SideBarLink href='/user/profile' label='Profile'>
                      <ThemedIcon Icon={User} />
                    </SideBarLink>
                    <SideBarLink href='/user/settings' label='Settings'>
                      <ThemedIcon Icon={Settings} />
                    </SideBarLink>
                    <SignOutButton />
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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
            {session?.user.isActive && (
              <div className='flex items-center gap-3'>
                <span className='text-sm font-medium text-gray-700 hover:underline dark:text-white'>
                  Welcome, {session.user.firstName}
                </span>
                <UserAvatar />
              </div>
            )}
            {!session?.user.isActive && (
              <NavLink href='/signin' label='Sign In' />
            )}
            <ToggleThemeButton />
          </nav>
        </div>
      </header>
    </>
  );
}
