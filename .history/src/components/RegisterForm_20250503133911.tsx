'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

const FormData = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(6).max(20),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ resolver: zodResolver(FormData) });

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setError('root', { message: 'user already exist' });
      // const response = await api.post('/api/signin', data);
      // setToken(response.data.accessToken);
    } catch (e) {
      setError('root', {
        // message: e?.response?.data.message,
      });
    }
  };

  return (
    <form className='space-y-4'>
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
          <div className='mt-2 text-sm text-red-500'>
            {errors['name'].message}
          </div>
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
        />
        {errors['email'] && (
          <div className='mt-2 text-sm text-red-500'>
            {errors['email'].message}
          </div>
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
          <Label htmlFor='password'> {errors['password'].message}</Label>
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
        <Button className='w-full'>Go Back</Button>
      </Link>

      {errors['root'] && (
        <Label htmlFor='password' className='align-center text-lg text-red-500'>
          {errors['root'].message}
        </Label>
      )}
    </form>
  );
};

export default RegisterForm;
