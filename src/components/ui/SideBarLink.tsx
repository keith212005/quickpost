'use client';
import React, { useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import Loader from '../Loader';

type SideBarLinkProps = {
  children: React.ReactNode;
  href: string;
  label: string;
};

export const SideBarLink = ({ children, href, label }: SideBarLinkProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const overviewSubRoutes = [
    '/admin/dashboard/overview',
    '/admin/dashboard/analytics',
    '/admin/dashboard/reports',
  ];
  const isActive =
    (href === '/admin/dashboard/overview' &&
      overviewSubRoutes.some((route) => pathname.startsWith(route))) ||
    pathname === href;

  return (
    <button
      onClick={() => startTransition(() => router.push(href))}
      className={`flex w-full items-center justify-between rounded-lg px-4 py-2 transition ${
        isActive
          ? 'bg-blue-100 text-blue-700 dark:bg-gray-800 dark:text-white'
          : 'text-gray-800 hover:bg-gray-200 dark:text-gray-300 hover:dark:bg-gray-700'
      }`}
      disabled={isPending}
    >
      <div className='flex items-center gap-3'>
        {children}
        <span>{label}</span>
      </div>
      <div className='flex flex-1 justify-end'>{isPending && <Loader />}</div>
    </button>
  );
};
