'use client';

import { Home, Settings, User } from 'lucide-react';
import Link from 'next/link';

import SideBarLink from '../ui/SideBarLink';
import ThemedIcon from '../ui/ThemedIcon';

export default function Sidebar() {
  return (
    <aside className='hidden h-screen w-64 flex-col border-r bg-white px-6 py-8 shadow-lg md:flex dark:bg-black'>
      <div className='mb-10'>
        <h1 className='text-2xl font-extrabold text-blue-700 dark:text-white'>
          QuickPost
        </h1>
        <span className='text-sm text-gray-500 dark:text-gray-400'>v1.0</span>
      </div>
      <nav className='flex flex-col space-y-3 text-[15px] font-medium text-gray-800'>
        <SideBarLink href='/dashboard' label='Feed'>
          <ThemedIcon Icon={Home} />
        </SideBarLink>

        <SideBarLink href='/profile' label='My Posts'>
          <ThemedIcon Icon={User} />
        </SideBarLink>

        <SideBarLink href='/settings' label='Settings'>
          <ThemedIcon Icon={Settings} />
        </SideBarLink>
      </nav>
    </aside>
  );
}
