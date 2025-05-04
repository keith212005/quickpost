import { Home, Link } from 'lucide-react';
import React from 'react';

const SideBarLink = () => {
  return (
    <Link
      href='/dashboard'
      className='flex items-center gap-3 rounded-lg px-4 py-2 transition hover:bg-gray-700 dark:text-white'
    >
      <Home className='h-5 w-5 hover:text-black dark:text-white' />
      Feed
    </>
  );
};

export default SideBarLink;
