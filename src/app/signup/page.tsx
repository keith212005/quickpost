import React from 'react';

import { SignupForm } from '@/components/SignupForm';

export default async function SignupPage() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-900'>
      <SignupForm />
    </div>
  );
}
