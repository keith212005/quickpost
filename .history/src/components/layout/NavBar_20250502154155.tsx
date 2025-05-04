'use client';

import { Hash, Home, Settings, User } from 'lucide-react';
import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className='hidden h-screen w-64 flex-col border-r bg-white px-6 py-6 shadow-lg md:flex'>
      <div className='mb-8'>
        <h2 className='text-2xl font-bold text-blue-600'>QuickPost</h2>
        <p className='text-xs text-gray-500'>Post. Engage. Grow.</p>
      </div>
      <div className='space-y-4'>
        <div>
          <h3 className='mb-2 text-xs font-semibold tracking-wide text-gray-400 uppercase'>
            General
          </h3>
          <nav className='flex flex-col space-y-2'>
            <Link
              href='/dashboard'
              className='flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-blue-50'
            >
              <Home className='h-4 w-4' />
              Feed
            </Link>
            <Link
              href='/profile'
              className='flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-blue-50'
            >
              <User className='h-4 w-4' />
              Profile
            </Link>
          </nav>
        </div>
        <div>
          <h3 className='mb-2 text-xs font-semibold tracking-wide text-gray-400 uppercase'>
            Manage
          </h3>
          <nav className='flex flex-col space-y-2'>
            <Link
              href='/settings'
              className='flex items-center gap-3 rounded-md px-3 py-2 text-gray-700 hover:bg-blue-50'
            >
              <Settings className='h-4 w-4' />
              Settings
            </Link>
            <Link
              href='/admin'
              className='flex items-center gap-3 rounded-md px-3 py-2 font-medium text-red-600 hover:bg-blue-50'
            >
              <Hash className='h-4 w-4' />
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </aside>
  );
}
