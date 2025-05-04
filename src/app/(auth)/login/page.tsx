import React from 'react';

import LoginForm from '@/components/LoginForm';

const Login = () => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-900'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-gray-800'>
        <h1 className='mb-6 text-center text-2xl font-bold text-gray-800 dark:text-white'>
          Login to QuickPost
        </h1>
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
