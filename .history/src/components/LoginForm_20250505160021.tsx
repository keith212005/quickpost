'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Github, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

import { LoginSchema, loginSchema } from '@/schemas/authSchemas';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

const LoginForm = () => {
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: 'kj@gmail.com', password: '111111' },
  });

  const onSubmit = async (data: LoginSchema) => {
    const res = await signIn('credentials', {
      redirect: false,
      email: data.email,
      password: data.password,
    });

    console.log(res);

    if (res?.error) {
      setError('root', { message: res.error });
    } else {
      router.replace('/feed');
    }
  };

  const handleGitHubSignIn = async () => {
    setIsGitHubLoading(true);
    try {
      const res = await signIn('github', {
        redirect: false,
        callbackUrl: '/feed',
      });

      if (res?.error) {
        setError('root', { message: 'GitHub sign-in failed.' });
      }
    } catch (e) {
      console.error('GitHub sign in error >>>>>', e);
      setError('root', { message: 'Something went wrong with GitHub login.' });
    } finally {
      setTimeout(() => {
        setIsGitHubLoading(false);
      }, 5000);
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900'>
      <div className='w-full max-w-md rounded-2xl border bg-white p-8 shadow-md dark:border-gray-700 dark:bg-gray-800'>
        <div className='mb-6 text-center'>
          <h1 className='mb-1 text-2xl font-bold text-gray-900 dark:text-gray-100'>
            Sign in to QuickPost
          </h1>
          <p className='text-sm text-gray-600 dark:text-gray-400'>
            Welcome back! Please sign in to your account.
          </p>
        </div>

        <div className='mb-6 flex gap-4'>
          <button
            type='button'
            onClick={handleGitHubSignIn}
            disabled={isGitHubLoading}
            className='flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-800 transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800'
          >
            {isGitHubLoading && <Loader2 className='animate-spin' />}
            <Github size={18} />
            <span className='text-sm font-medium'>GitHub</span>
          </button>
          <button
            type='button'
            onClick={() => signIn('google', { callbackUrl: '/feed' })}
            className='flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2 text-gray-800 transition hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800'
          >
            <svg
              width='18'
              height='18'
              viewBox='0 0 48 48'
              className='mr-1'
              aria-hidden='true'
            >
              <g>
                <path
                  fill='#4285F4'
                  d='M44.5 20H24v8.5h11.7C34.7 33.1 29.9 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c2.8 0 5.3.9 7.3 2.5l6.2-6.2C33.7 6.1 29.1 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 19.7-8 19.7-20 0-1.3-.1-2.7-.3-4z'
                ></path>
                <path
                  fill='#34A853'
                  d='M6.3 14.7l7 5.1C15.2 17 19.2 14 24 14c2.8 0 5.3.9 7.3 2.5l6.2-6.2C33.7 6.1 29.1 4 24 4c-7.6 0-14.1 4.3-17.7 10.7z'
                ></path>
                <path
                  fill='#FBBC05'
                  d='M24 44c5.9 0 10.7-1.9 14.3-5.1l-6.6-5.4C29.7 35.1 27 36 24 36c-5.8 0-10.6-3.9-12.3-9.1l-7 5.4C7.8 39.7 15.2 44 24 44z'
                ></path>
                <path
                  fill='#EA4335'
                  d='M44.5 20H24v8.5h11.7c-1.1 3-4.2 7.5-11.7 7.5-6.6 0-12-5.4-12-12 0-1.3.2-2.5.6-3.6l7-5.1C20.8 17 24 20 24 20h20.5z'
                ></path>
              </g>
            </svg>
            <span className='text-sm font-medium'>Google</span>
          </button>
        </div>

        <div className='mb-6 flex items-center'>
          <div className='flex-grow border-t border-gray-200 dark:border-gray-700'></div>
          <span className='mx-4 text-xs font-medium text-gray-400 dark:text-gray-500'>
            OR CONTINUE WITH
          </span>
          <div className='flex-grow border-t border-gray-200 dark:border-gray-700'></div>
        </div>

        <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor='email' className='text-gray-700 dark:text-gray-200'>
              Email
            </Label>
            <Input
              {...register('email')}
              id='email'
              type='email'
              placeholder='you@example.com'
              className='mt-1'
            />
            {errors['email'] && (
              <Label
                htmlFor='email'
                className='mt-2 text-sm text-red-500 dark:text-red-400'
              >
                {errors['email'].message}
              </Label>
            )}
          </div>
          <div>
            <Label
              htmlFor='password'
              className='text-gray-700 dark:text-gray-200'
            >
              Password
            </Label>
            <Input
              {...register('password')}
              id='password'
              type='password'
              placeholder='••••••••'
              className='mt-1'
            />
            {errors['password'] && (
              <Label
                htmlFor='password'
                className='mt-2 text-sm text-red-500 dark:text-red-400'
              >
                {errors['password'].message}
              </Label>
            )}
          </div>

          <Button
            disabled={isSubmitting}
            type='submit'
            className='mt-2 w-full rounded-xl bg-gray-900 py-2 font-semibold text-white hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600'
          >
            {isSubmitting && <Loader2 className='animate-spin' />}
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>

          {errors['root'] && (
            <Label
              htmlFor='password'
              className='mt-2 block w-full text-center text-lg text-red-500 dark:text-red-400'
            >
              {errors['root'].message}
            </Label>
          )}
        </form>

        <p className='mt-6 text-center text-sm text-gray-600 dark:text-gray-400'>
          Don&apos;t have an account?{' '}
          <Link
            href='/register'
            className='font-medium text-blue-600 hover:underline dark:text-blue-400'
          >
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
