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
    <div className='mx-auto max-w-md rounded-xl border border-gray-800 bg-black p-8 shadow-md'>
      <h2 className='mb-2 text-2xl font-bold text-white'>Create an account</h2>
      <p className='mb-6 text-sm text-gray-400'>
        Enter your email below to create your account
      </p>

      <div className='mb-6 flex gap-4'>
        <Button
          type='button'
          onClick={handleGitHubSignIn}
          disabled={isGitHubLoading}
          className='flex w-full items-center justify-center gap-2 border border-gray-600 bg-black text-white hover:bg-gray-800'
        >
          {isGitHubLoading && <Loader2 className='animate-spin' />}
          <Github />
          GitHub
        </Button>
        <Button
          type='button'
          disabled
          className='flex w-full items-center justify-center gap-2 border border-gray-600 bg-black text-white opacity-50'
        >
          <span className='text-lg font-bold'>G</span> Google
        </Button>
      </div>

      <div className='mb-6 text-center text-sm text-gray-500'>
        OR CONTINUE WITH
      </div>

      <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor='email' className='text-white'>
            Email
          </Label>
          <Input
            {...register('email')}
            id='email'
            type='email'
            placeholder='m@example.com'
            className='mt-1'
          />
          {errors['email'] && (
            <Label htmlFor='email' className='mt-2 text-sm text-red-500'>
              {errors['email'].message}
            </Label>
          )}
        </div>
        <div>
          <Label htmlFor='password' className='text-white'>
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
            <Label htmlFor='password' className='mt-2 text-sm text-red-500'>
              {errors['password'].message}
            </Label>
          )}
        </div>

        {errors['root'] && (
          <Label
            htmlFor='password'
            className='block w-full text-center text-lg text-red-500'
          >
            {errors['root'].message}
          </Label>
        )}

        <Button
          disabled={isSubmitting}
          type='submit'
          className='w-full bg-white text-black hover:bg-gray-200'
        >
          {isSubmitting && <Loader2 className='animate-spin' />}
          {isSubmitting ? 'Signing in...' : 'Create account'}
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
