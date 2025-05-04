import { Home, Link } from 'lucide-react';
import React from 'react';

type SideBarLinkProps = {
  children: React.ReactNode;
  href: string;
  label: string;
};

const SideBarLink = ({ children, href, label }: SideBarLinkProps) => {
  return (
    <Link
      href='/dashboard'
      className='flex items-center gap-3 rounded-lg px-4 py-2 transition hover:bg-gray-700 dark:text-white'
    >
      {children}
      Feed
    </Link>
  );
};

export default SideBarLink;
