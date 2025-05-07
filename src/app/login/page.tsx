import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

import LoginForm from '@/components/LoginForm';

import { authOptions } from '../api/auth/[...nextauth]/route';

interface LoginPageProps {
  searchParams: { error?: string };
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const session = await getServerSession(authOptions);

  if (session?.user?.role === 'admin') {
    redirect('/admin/dashboard'); // admin dashboard
  } else if (session?.user && session?.user?.isActive === true) {
    redirect('/user/feed'); // regular user feed
  }

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-900'>
      <LoginForm errorMessage={searchParams.error} />
    </div>
  );
}
