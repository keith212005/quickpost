'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Github, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

import { LoginSchema, loginSchema } from '@/lib/validations';

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
            variant='outline'
            className='flex flex-1 items-center justify-center gap-2'
          >
            <span className='mr-2'>G</span>
            Google
          </Button>
        </div>
        <div className='my-4 flex items-center gap-4'>
          <Separator className='flex-1' />
          <span className='text-muted-foreground text-xs font-medium'>
            OR CONTINUE WITH
          </span>
          <Separator className='flex-1' />
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <div>
            <Label htmlFor='email'>Email</Label>
            <Input
              {...register('email')}
              id='email'
              type='email'
              placeholder='you@example.com'
              className='mt-2'
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
          <div>
            <Label htmlFor='password'>Password</Label>
            <Input
              {...register('password')}
              id='password'
              type='password'
              placeholder='••••••••'
              className='mt-2'
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
