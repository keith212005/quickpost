'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

const RegisterForm = () => {
  return (
    <form className='space-y-4'>
      <div>
        <Label htmlFor='name'>Name</Label>
        <Input id='name' type='text' placeholder='Your name' className='mt-1' />
      </div>
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

      <Link href='/login' className='text-sm text-gray-600 dark:text-gray-400'>
        <Button className='w-full'>Go Back</Button>
      </Link>
    </form>
  );
};

export default RegisterForm;
