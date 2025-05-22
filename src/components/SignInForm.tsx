'use client';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Github, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

import { authErrorMessages } from '@/constants/constants';
import { LoginSchema, loginSchema } from '@/lib/validations';

import { OAuthButton } from './OAuthButton';
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

export const SignInForm = () => {
  const { data: session } = useSession();
  const url =
    session?.user?.role === 'admin'
      ? '/admin/dashboard/overview'
      : '/user/feed';
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const [isGitHubLoading, setIsGitHubLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

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
    if (error) setError('root', { message: error });
  }, [error, setError]);

  const onSubmit = async (data: LoginSchema) => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: data.email,
        password: data.password,
        callbackUrl: url,
      });

      if (!res) {
        setError('root', { message: 'Something went wrong during login.' });
        return;
      }

      if (res.error) {
        setError('root', {
          message:
            authErrorMessages[res.error as keyof typeof authErrorMessages] ??
            res.error,
        });
        return;
      }

      if (res.ok && res.url) {
        window.location.href = res.url;
      }
    } catch {
      setError('root', {
        message: 'Something went wrong during login.',
      });
    }
  };

  const handleOAuthSignIn = async (provider: string) => {
    if (provider === 'github') {
      setIsGitHubLoading(true);
    }
    if (provider === 'google') {
      setIsGoogleLoading(true);
    }
    try {
      await signIn(provider, { redirectTo: url });
    } catch (e) {
      console.error(`${provider} sign in error >>>>>`, e);
      setError('root', {
        message: `Something went wrong with ${provider} login.`,
      });
    } finally {
      setTimeout(() => {
        if (provider === 'github') {
          setIsGitHubLoading(false);
        }
        if (provider === 'google') {
          setIsGoogleLoading(false);
        }
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
          <OAuthButton
            label='GitHub'
            provider='github'
            icon={<Github size={18} />}
            isLoading={isGitHubLoading}
            onClick={handleOAuthSignIn}
          />
          <OAuthButton
            label='Google'
            provider='google'
            isLoading={isGoogleLoading}
            onClick={handleOAuthSignIn}
          />
        </div>

        <div className='my-4 flex items-center gap-4'>
          <Separator className='flex-1' />
          <span className='text-muted-foreground text-xs font-medium'>
            OR CONTINUE WITH
          </span>
          <Separator className='flex-1' />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <Label htmlFor='email'>Email</Label>
          <Input
            {...register('email')}
            id='email'
            type='email'
            placeholder='you@example.com'
            className='mt-2'
          />
          {errors.email && (
            <Label htmlFor='email' className='mt-2 block text-sm text-red-500'>
              {errors.email.message}
            </Label>
          )}

          <Label htmlFor='password'>Password</Label>
          <Input
            {...register('password')}
            id='password'
            type='password'
            placeholder='••••••••'
            className='mt-2'
          />
          {errors.password && (
            <Label
              htmlFor='password'
              className='mt-2 block text-sm text-red-500'
            >
              {errors.password.message}
            </Label>
          )}

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

          {errors.root && (
            <Label
              htmlFor='password'
              className='mt-3 block w-full text-center text-base text-red-500'
            >
              {errors.root.message}
            </Label>
          )}
        </form>
      </CardContent>

      <CardFooter className='flex-col'>
        <div className='w-full text-center text-sm'>
          Don&apos;t have an account?{' '}
          <Link href='/signup'>
            <Button variant='link' size='sm' asChild>
              <span>Register here</span>
            </Button>
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
};
