'use client';

import { Home, Settings, User } from 'lucide-react';
import Link from 'next/link';

import SideBarLink from '../ui/SideBarLink';

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
          <Home className='h-5 w-5 hover:text-black dark:text-white' />
        </SideBarLink>
        {/* <Link
          href='/dashboard'
          className='flex items-center gap-3 rounded-lg px-4 py-2 transition hover:bg-gray-700 dark:text-white'
        >
          <Home className='h-5 w-5 hover:text-black dark:text-white' />
          Feed
        </Link> */}
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
      </nav>
    </aside>
  );
}
