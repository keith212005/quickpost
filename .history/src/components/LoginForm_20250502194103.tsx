import Link from 'next/link';
import React from 'react';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

const LoginForm = () => {
  return (
    <form className='space-y-4'>
      <div>
        <Label htmlFor='email'>Email</Label>
        <Input
          id='email'
          type='email'
          placeholder='you@example.com'
          className='mt-1'
        />
      </div>
      <div>
        <Label htmlFor='password'>Password</Label>
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
      <p className='text-sm text-gray-600 dark:text-gray-400'>
        Don&apos;t have an account?{' '}
        <Link
          href='/register'
          className='font-medium text-blue-600 hover:underline dark:text-blue-400'
        >
          Register here
        </Link>
      </p>
    </form>
  );
};

export default LoginForm;
