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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';

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
    <Card className='w-full max-w-md'>
      <CardHeader>
        <CardTitle>Sign in to QuickPost</CardTitle>
        <CardDescription>
          Welcome back! Please sign in to your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className='mb-6 flex gap-4'>
          <Button
            type='button'
            onClick={handleGitHubSignIn}
            disabled={isGitHubLoading}
            variant='outline'
            size='lg'
            className='flex flex-1 items-center justify-center gap-2'
          >
            {isGitHubLoading && <Loader2 className='animate-spin' />}
            <Github size={18} />
            <span>GitHub</span>
          </Button>
          <Button
            type='button'
            onClick={() => signIn('google', { callbackUrl: '/feed' })}
            variant='outline'
            size='lg'
            className='flex flex-1 items-center justify-center gap-2'
          >
            <svg
              width='18'
              height='18'
              viewBox='0 0 48 48'
              aria-hidden='true'
              className='mr-1'
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
            <span>Google</span>
          </Button>
        </div>
        <div className='my-4 flex items-center gap-4'>
          <Separator className='flex-1' />
          <span className='text-muted-foreground text-xs font-medium'>
            OR CONTINUE WITH
          </span>
          <Separator className='flex-1' />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='mt-4'>
            <Label htmlFor='email'>Email</Label>
            <Input
              {...register('email')}
              id='email'
              type='email'
              placeholder='you@example.com'
            />
            {errors['email'] && (
              <Label
                htmlFor='email'
                className='mt-2 block text-sm text-red-500'
              >
                {errors['email'].message}
              </Label>
            )}
          </div>
          <div className='mb-4'>
            <Label htmlFor='password'>Password</Label>
            <Input
              {...register('password')}
              id='password'
              type='password'
              placeholder='••••••••'
            />
            {errors['password'] && (
              <Label
                htmlFor='password'
                className='mt-2 block text-sm text-red-500'
              >
                {errors['password'].message}
              </Label>
            )}
          </div>
          <Button
            disabled={isSubmitting}
            type='submit'
            variant='default'
            size='lg'
            className='w-full'
          >
            {isSubmitting && <Loader2 className='animate-spin' />}
            {isSubmitting ? 'Signing in...' : 'Sign In'}
          </Button>
          {errors['root'] && (
            <Label
              htmlFor='password'
              className='mt-3 block w-full text-center text-base text-red-500'
            >
              {errors['root'].message}
            </Label>
          )}
        </form>
      </CardContent>
      <CardFooter className='flex-col'>
        <div className='w-full text-center text-sm'>
          Don&apos;t have an account?{' '}
          <Link href='/register'>
            <Button variant='link' size='sm' asChild>
              <span>Register here</span>
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
