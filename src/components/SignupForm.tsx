'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Github, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

import { registerUser } from '@/app/actions/registerUser';
import { RegisterSchema, registerSchema } from '@/lib/validations';

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

export const SignupForm = () => {
  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  const { status } = useSession();
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/dashboard');
    }
  }, [status, router]);

  const onSubmit = async (data: RegisterSchema) => {
    const res = await registerUser(data.name, data.email, data.password);

    if (!res || res.error) {
      setError('root', { message: 'Registration failed. Please try again.' });
    } else {
      setError('root', {
        message: 'Registration successful. Please go to login',
      });
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
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your email below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          className='space-y-4'
          autoComplete='off'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <Label htmlFor='name'>Name</Label>
            <Input
              {...register('name')}
              id='name'
              type='text'
              placeholder='Your name'
              className='mt-2'
            />
            {errors['name'] && (
              <Label htmlFor='name' className='mt-2 text-sm text-red-500'>
                {errors['name'].message}
              </Label>
            )}
          </div>
          <div>
            <Label htmlFor='email'>Email</Label>
            <Input
              {...register('email')}
              id='email'
              type='email'
              placeholder='you@example.com'
              className='mt-2'
              name='email'
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
              className='mt-2'
            />
            {errors['password'] && (
              <Label htmlFor='password' className='mt-2 text-sm text-red-500'>
                {errors['password'].message}
              </Label>
            )}
          </div>

          <Button disabled={isSubmitting} type='submit' className='w-full'>
            {isSubmitting ? 'Loading...' : 'Sign Up'}
          </Button>

          <div className='text-muted-foreground mt-5 flex items-center gap-2 text-sm'>
            <Separator className='flex-1' />
            OR CONTINUE WITH
            <Separator className='flex-1' />
          </div>

          <div className='flex justify-between gap-4'>
            <Button
              type='button'
              onClick={handleGitHubSignIn}
              variant='outline'
              className='flex flex-1 items-center justify-center gap-2'
            >
              {isGitHubLoading && <Loader2 className='animate-spin' />}
              <Github className='mr-2 h-4 w-4' />
              GitHub
            </Button>
            <Button
              variant='outline'
              className='flex flex-1 items-center justify-center gap-2'
            >
              <span className='mr-2'>G</span>
              Google
            </Button>
          </div>
        </form>
      </CardContent>
      <CardFooter className='flex-col gap-4'>
        <Link href='/signin' className='w-full'>
          <Button
            variant='ghost'
            className='bg-muted text-muted-foreground w-full dark:bg-gray-800 dark:text-white'
          >
            Go to Sign In
          </Button>
        </Link>
        {errors['root'] && (
          <Label
            htmlFor='password'
            className={`mt-2 block w-full text-center text-lg ${
              errors['root'].message ===
              'Registration successful. Please go to login'
                ? 'text-green-500'
                : 'text-red-500'
            }`}
          >
            {errors['root'].message}
          </Label>
        )}
      </CardFooter>
    </Card>
  );
};
