'use client';

import React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Register = () => {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100 px-4'>
      <div className='w-full max-w-md rounded-lg bg-white p-8 shadow-md'>
        <h1 className='mb-6 text-center text-2xl font-bold text-gray-800'>
          Create your QuickPost account
        </h1>
        <form className='space-y-4'>
          <div>
            <label
              htmlFor='name'
              className='block text-sm font-medium text-gray-700'
            >
              Name
            </label>
            <Input
              id='name'
              type='text'
              placeholder='Your name'
              className='mt-1'
            />
          </div>
          <div>
            <label
              htmlFor='email'
              className='block text-sm font-medium text-gray-700'
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
              className='block text-sm font-medium text-gray-700'
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
            Register
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Register;
