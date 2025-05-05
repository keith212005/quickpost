'use client';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Github } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { RegisterSchema, registerSchema } from '@/schemas/authSchemas';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';

const SignupForm = () => {
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
    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      console.log(res);

      if (!res.ok) setError('root', { message: 'Registration failed' });
      if (res.ok)
        setError('root', {
          message: 'Registration successful. Please go to login',
        });
    } catch (e) {
      console.error(e);
      setError('root', { message: 'Something went wrong' });
    }
  };

  return (
    <form
      className='mt-6 space-y-4 rounded-xl border bg-white p-8 shadow-md dark:bg-zinc-900'
      autoComplete='off'
    >
      <h1 className='text-2xl font-bold'>Create an account</h1>
      <p className='text-muted-foreground mb-6 text-sm'>
        Enter your email below to create your account
      </p>

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

      <Button
        disabled={isSubmitting}
        onClick={handleSubmit(onSubmit)}
        type='submit'
        className='w-full'
      >
        {isSubmitting ? 'Loading...' : 'Sign Up'}
      </Button>

      <Link href='/login' className='text-sm text-gray-600 dark:text-gray-400'>
        <Button className='w-full'>Go to Sign In</Button>
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

      <div className='text-muted-foreground mh-4 flex items-center gap-2 text-sm'>
        <Separator className='flex-1' />
        OR CONTINUE WITH
        <Separator className='flex-1' />
      </div>

      <div className='flex justify-between gap-4'>
        <Button
          variant='outline'
          className='flex flex-1 items-center justify-center gap-2'
        >
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
  );
};

export default SignupForm;
