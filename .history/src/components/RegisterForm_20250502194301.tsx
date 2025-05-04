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
        Register
      </Button>
    </form>
  );
};

export default RegisterForm;
