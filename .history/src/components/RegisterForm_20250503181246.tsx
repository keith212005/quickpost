'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import bycrypt from 'bcryptjs';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';

import { env } from '@/lib/env';
import { RegisterSchema, registerSchema } from '@/schemas/authSchemas';

import { prisma } from '../lib/db';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

const RegisterForm = () => {
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

  console.log(env.DATABASE_URL);

  const onSubmit = async (data: RegisterSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const { name, email, password } = data;

    try {
      const hashedPassword = await bycrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      console.log(user);
      router.push('/dashboard');
    } catch (e) {
      console.error(e);
      setError('root', { message: 'Something went wrong' });
    }
  };

  return (
    <form className='space-y-4' autoComplete='off'>
      <div>
        <Label htmlFor='name'>Name</Label>
        <Input
          {...register('name')}
          id='name'
          type='text'
          placeholder='Your name'
          className='mt-1'
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
          className='mt-1'
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

      <Link href='/login' className='text-sm text-gray-600 dark:text-gray-400'>
        <Button className='w-full'>Sign In</Button>
      </Link>

      {errors['root'] && (
        <Label
          htmlFor='password'
          className='mt-2 block w-full text-center text-lg text-red-500'
        >
          {errors['root'].message}
        </Label>
      )}
    </form>
  );
};

export default RegisterForm;
