'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

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

const ErrorMessage = ({ message }: { message?: string }) => {
  if (!message) return null;
  return (
    <Label className='mt-2 text-sm text-red-500' role='alert'>
      {message}
    </Label>
  );
};

export const SignupForm = () => {
  const { data: session } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  useEffect(() => {
    if (session) {
      // Redirect based on role
      if (session.user?.role === 'admin') {
        redirect('/admin/dashboard/overview');
      } else if (session.user?.role === 'user' && session.user?.isActive) {
        redirect('/user/feed');
      }
    }
  }, [session]);

  const onSubmit = async (data: RegisterSchema) => {
    const res = await registerUser(
      data.firstName,
      data.lastName,
      data.email,
      data.password,
    );

    if (!res || res.error) {
      setError('root', { message: 'Registration failed. Please try again.' });
    } else {
      setError('root', {
        message: 'Registration successful. Please go to login',
      });
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
          <Label htmlFor='firstName'>First Name</Label>
          <Input
            {...register('firstName')}
            id='firstName'
            type='text'
            placeholder='Your name'
            className='mt-2'
          />
          <ErrorMessage message={errors.firstName?.message?.toString()} />

          <Label htmlFor='lastName'>Last Name</Label>
          <Input
            {...register('lastName')}
            id='lastName'
            type='text'
            placeholder='Your name'
            className='mt-2'
          />
          <ErrorMessage message={errors.lastName?.message?.toString()} />

          <Label htmlFor='email'>Email</Label>
          <Input
            {...register('email')}
            id='email'
            type='email'
            placeholder='you@example.com'
            className='mt-2'
            name='email'
          />
          <ErrorMessage message={errors.email?.message?.toString()} />

          <Label htmlFor='password'>Password</Label>
          <Input
            {...register('password')}
            id='password'
            type='password'
            placeholder='••••••••'
            className='mt-2'
          />
          <ErrorMessage message={errors.password?.message?.toString()} />

          <Button disabled={isSubmitting} type='submit' className='w-full'>
            {isSubmitting ? 'Loading...' : 'Sign Up'}
          </Button>
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
        {errors.root && (
          <Label
            className={`mt-2 block w-full text-center text-lg ${
              errors.root.message ===
              'Registration successful. Please go to login'
                ? 'text-green-500'
                : 'text-red-500'
            }`}
            role='alert'
          >
            {errors.root.message}
          </Label>
        )}
      </CardFooter>
    </Card>
  );
};
