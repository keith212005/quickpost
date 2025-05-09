'use client';

import { useSession } from 'next-auth/react';

export function useCurrentUser() {
  const { data: session, status } = useSession();

  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated' && !!session?.user?.id;

  return {
    user: session?.user,
    userId: session?.user?.id,
    isLoading,
    isAuthenticated,
  };
}
