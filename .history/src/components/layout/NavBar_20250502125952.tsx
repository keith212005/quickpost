'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <header className="w-full bg-yellow-700 shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-xl font-bold text-blue-600">
          QuickPost
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/dashboard">Feed</Link>
          <Link href="/profile">Profile</Link>
          <Link href="/admin" className="text-red-500 font-semibold">
            Admin
          </Link>
        </nav>
      </div>
    </header>
  );
}