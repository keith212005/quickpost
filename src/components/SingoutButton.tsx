'use client';

import React from 'react';
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';

import ThemedIcon from './ui/ThemedIcon';

type Props = {
  onClick?: () => void;
};

export const SignOutButton = ({ onClick }: Props) => {
  return (
    <button
      onClick={() => {
        onClick?.();
        signOut({ callbackUrl: '/signin?loggedOut=true' });
      }}
      className='flex items-center gap-3 rounded-lg px-4 py-2 transition hover:bg-gray-200 dark:text-white hover:dark:bg-gray-700'
    >
      <ThemedIcon Icon={LogOut} />
      Logout
    </button>
  );
};
