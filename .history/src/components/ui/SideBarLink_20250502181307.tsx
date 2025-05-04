import Link from 'next/link';
import React from 'react';

type SideBarLinkProps = {
  children: React.ReactNode;
  href: string;
  label: string;
};

const SideBarLink = ({ children, href, label }: SideBarLinkProps) => {
  return (
    <Link
      href={href}
      className='flex items-center gap-3 rounded-lg px-4 py-2 transition hover:bg-gray-700 dark:text-white'
    >
      {children}
      {label}
    </Link>
  );
};

export default SideBarLink;
