'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Github } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import { LoginSchema, loginSchema } from '@/schemas/authSchemas';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Spinner } from './ui/spinner';

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

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/feed');
    }
  }, [status, router]);

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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await signIn('github', { callbackUrl: '/feed' });
    } catch (e) {
      console.log('github sign in error>>>>>', e);
    } finally {
      setIsGitHubLoading(false);
    }
  };

  if (status === 'loading') {
    return <Spinner className='h-20' />;
  }

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
        {isSubmitting ? 'Loading...' : 'Sign In'}
      </Button>

      <Button
        type='button'
        onClick={handleGitHubSignIn}
        disabled={isGitHubLoading}
        className='flex w-full items-center justify-center gap-2 bg-gray-950 text-white hover:bg-gray-700'
      >
        <Github className='h-5 w-5' />
        {isGitHubLoading ? 'Signing in...' : 'Sign In with GitHub'}
      </Button>

      <Spinner className='h-20' />

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
