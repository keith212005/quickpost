'use client';

import Link from 'next/link';
import { Button } from '../ui/button';

export default function Sidebar() {
  return (
    <aside className="h-screen w-60 bg-gray-100 px-4 py-6 border-r hidden md:block">
      <nav className="flex flex-col space-y-4">

       <Button className="w-full">New Post</Button>
        {/* <Link href="/dashboard" className="hover:text-blue-500">
          Home
        </Link>
        <Link href="/profile" className="hover:text-blue-500">
          My Posts
        </Link>
        <Link href="/settings" className="hover:text-blue-500">
          Settings
        </Link> */}
      </nav>
    </aside>
  );
}