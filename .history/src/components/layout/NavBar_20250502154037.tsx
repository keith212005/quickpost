'use client';

import { Home, Settings, User } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className='hidden h-screen w-64 flex-col border-r border-gray-200 bg-gray-50 px-6 py-8 shadow-md md:flex'>
      <div className='mb-10'>
        <h2 className='text-3xl font-bold text-gray-800'>QuickPost</h2>
        <p className='text-xs text-gray-500'>by Keith</p>
      </div>
      <nav className='space-y-2 text-sm text-gray-700'>
        <Link
          href='/dashboard'
          className='flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-blue-100'
        >
          <Home className='h-4 w-4' />
          Feed
        </Link>
        <Link
          href='/profile'
          className='flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-blue-100'
        >
          <User className='h-4 w-4' />
          Profile
        </Link>
        <Link
          href='/settings'
          className='flex items-center gap-3 rounded-md px-3 py-2 transition-colors hover:bg-blue-100'
        >
          <Settings className='h-4 w-4' />
          Settings
        </Link>
      </nav>
    </aside>
  );
}
