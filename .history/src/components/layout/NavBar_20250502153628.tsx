'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <header className='sticky top-0 z-50 w-full border-b bg-white/70 backdrop-blur-md'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-4'>
        <Link
          href='/'
          className='text-2xl font-semibold text-gray-800 transition-colors hover:text-blue-600'
        >
          QuickPost
        </Link>
        <nav className='flex items-center gap-6 text-sm font-medium text-gray-600'>
          <Link
            href='/dashboard'
            className='transition-colors hover:text-blue-500'
          >
            Feed
          </Link>
          <Link
            href='/profile'
            className='transition-colors hover:text-blue-500'
          >
            Profile
          </Link>
          <Link
            href='/admin'
            className='font-semibold text-red-600 transition-colors hover:text-red-700'
          >
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}
