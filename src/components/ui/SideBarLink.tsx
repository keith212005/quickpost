'use client';
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type SideBarLinkProps = {
  children: React.ReactNode;
  href: string;
  label: string;
};

const SideBarLink = ({ children, href, label }: SideBarLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + '/');

  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-lg px-4 py-2 transition ${
        isActive
          ? 'bg-blue-100 text-blue-700 dark:bg-gray-800 dark:text-white'
          : 'text-gray-800 hover:bg-gray-200 dark:text-gray-300 hover:dark:bg-gray-700'
      }`}
    >
      {children}
      <span>{label}</span>
    </Link>
  );
};

export default SideBarLink;
