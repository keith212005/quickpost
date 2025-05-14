'use client';
import React, { useTransition } from 'react';
import { useRouter } from 'next/navigation';

type SideBarLinkProps = {
  children: React.ReactNode;
  href: string;
  label: string;
};

const SideBarLink = ({ children, href, label }: SideBarLinkProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = useRouter().pathname || '';
  const isActive = pathname === href || pathname.startsWith(href + '/');

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
      {isPending && (
        <svg
          className='ml-2 h-4 w-4 animate-spin text-blue-500'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
        >
          <circle
            className='opacity-25'
            cx='12'
            cy='12'
            r='10'
            stroke='currentColor'
            strokeWidth='4'
          ></circle>
          <path
            className='opacity-75'
            fill='currentColor'
            d='M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z'
          ></path>
        </svg>
      )}
    </button>
  );
};

export default SideBarLink;
