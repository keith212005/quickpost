import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';

const FormData = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
});

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({ resolver: zodResolver(FormData) });

  const onSubmit = async (data) => {
    try {
      // const response = await api.post('/api/signin', data);
      // setToken(response.data.accessToken);
    } catch (e) {
      setError('root', {
        message: e.response.data.message,
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => console.log(data))}
      className='space-y-4'
    >
      <div>
        <Label htmlFor='name'>Name</Label>
        <Input
          {...register('name')}
          id='name'
          type='text'
          placeholder='Your name'
          className='mt-1'
        />
        {errors.name && <p>Name is required.</p>}
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
        {errors.email && <p>Email is required.</p>}
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
        {errors.password && <p>Password is required.</p>}
      </div>
      <Button onClick={handleSubmit(onSubmit)} type='submit' className='w-full'>
        Register
      </Button>

      <Link href='/login' className='text-sm text-gray-600 dark:text-gray-400'>
        <Button className='w-full'>Go Back</Button>
      </Link>

      {errors.root && (
        <div className='text-center text-sm text-red-500'>
          {errors.root.message}
        </div>
      )}
    </form>
  );
};

export default RegisterForm;
