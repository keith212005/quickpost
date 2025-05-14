'use client';
import React, { useTransition } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import Loader from '../Loader';

type SideBarLinkProps = {
  children: React.ReactNode;
  href: string;
  label: string;
};

const SideBarLink = ({ children, href, label }: SideBarLinkProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();

  const isActive =
    (href === '/admin/dashboard/overview' &&
      pathname.startsWith('/admin/dashboard/overview')) ||
    (href === '/admin/dashboard/overview' &&
      pathname.startsWith('/admin/dashboard/analytics')) ||
    (href === '/admin/dashboard/overview' &&
      pathname.startsWith('/admin/dashboard/reports')) ||
    pathname === href;
  console.log('pathname', pathname, href, isActive);

  return (
    <button
      onClick={() => startTransition(() => router.push(href))}
      className={`flex items-center gap-3 rounded-lg px-4 py-2 transition ${
        isActive
          ? 'bg-blue-100 text-blue-700 dark:bg-gray-800 dark:text-white'
          : 'text-gray-800 hover:bg-gray-200 dark:text-gray-300 hover:dark:bg-gray-700'
      }`}
      disabled={isPending}
    >
      {children}
      <span>{label}</span>
      {isPending && <Loader />}
    </button>
  );
};

export default SideBarLink;
