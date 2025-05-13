import React from 'react';

import { SignInForm } from '@/components/SignInForm';

export default async function SignInPage() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-900'>
      <SignInForm />
    </div>
  );
}
