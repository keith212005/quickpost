'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Github } from 'lucide-react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { LoginSchema, loginSchema } from '@/schemas/authSchemas';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

const LoginForm = () => {
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    try {
      setError('root', { message: 'Invalid credentials. Please try again' });
      // const response = await api.post('/api/signin', data);
      // setToken(response.data.accessToken);
    } catch (e) {
      console.error(e);
      setError('root', { message: 'Something went wrong' });
    }
  };

  const handleGitHubSignIn = async () => {
    setIsGitHubLoading(true);
    try {
      await signIn('github', { callbackUrl: '/dashboard' });
    } finally {
      setIsGitHubLoading(false);
    }
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
        {errors['password'] && (
          <Label htmlFor='password' className='mt-2 text-sm text-red-500'>
            {errors['password'].message}
          </Label>
        )}
      </div>

      <Button
        disabled={isSubmitting}
        onClick={handleSubmit(onSubmit)}
        type='submit'
        className='w-full'
      >
        {isSubmitting ? 'Loading...' : 'Sign Up'}
      </Button>

      <Button
        type='button'
        onClick={handleGitHubSignIn}
        disabled={isGitHubLoading}
        className='flex w-full items-center justify-center gap-2 bg-gray-950 text-white hover:bg-gray-700'
      >
        {isGitHubLoading ? (
          'Signing in...'
        ) : (
          <>
            <Github className='h-5 w-5' />
            {isGitHubLoading ? 'Signing in...' : 'Sign In with GitHub}'}
          </>
        )}
      </Button>

      {errors['root'] && (
        <Label
          htmlFor='password'
          className='mt-2 block w-full text-center text-lg text-red-500'
        >
          {errors['root'].message}
        </Label>
      )}

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
