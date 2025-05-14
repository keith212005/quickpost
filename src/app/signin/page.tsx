import React from 'react';
import { redirect } from 'next/navigation';

import { auth } from '@/auth';
import { SignInForm } from '@/components/SignInForm';

export default async function SignInPage() {
  const session = await auth();

  if (session) {
    // Redirect based on role
    if (session.user?.role === 'admin') {
      redirect('/admin/dashboard');
    } else if (session.user?.role === 'user' && session.user?.isActive) {
      redirect('/user/feed');
    }
  }
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-900'>
      <SignInForm />
    </div>
  );
}
