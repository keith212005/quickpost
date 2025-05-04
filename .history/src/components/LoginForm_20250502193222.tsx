import React from 'react';

const LoginForm = () => {
  return (
    <form className='space-y-4'>
      <div>
        <label
          htmlFor='email'
          className='block text-sm font-medium text-gray-700 dark:text-gray-300'
        >
          Email
        </label>
        <Input
          id='email'
          type='email'
          placeholder='you@example.com'
          className='mt-1'
        />
      </div>
      <div>
        <label
          htmlFor='password'
          className='block text-sm font-medium text-gray-700 dark:text-gray-300'
        >
          Password
        </label>
        <Input
          id='password'
          type='password'
          placeholder='••••••••'
          className='mt-1'
        />
      </div>
      <Button type='submit' className='w-full'>
        Sign In
      </Button>
    </form>
  );
};

export default LoginForm;
