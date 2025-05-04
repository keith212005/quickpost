import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';

import { LoginSchema, loginSchema } from '@/schemas/authSchemas';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginSchema) => {
    console.log(data);
  };
  return (
    <form className='space-y-4'>
      <div>
        <Label htmlFor='email'>Email</Label>
        <Input
          {...register('email')}
          id='email'
          type='email'
          placeholder='you@example.com'
          className='mt-1'
        />
        {errors['email'] && (
          <Label htmlFor='email' className='mt-2 text-sm text-red-500'>
            {errors['email'].message}
          </Label>
        )}
      </div>
      <div>
        <Label htmlFor='password'>Password</Label>
        <Input
          {...register('password')}
          id='password'
          type='password'
          placeholder='••••••••'
          className='mt-1'
        />
      </div>
      <Button onClick={handleSubmit(onSubmit)} type='submit' className='w-full'>
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
