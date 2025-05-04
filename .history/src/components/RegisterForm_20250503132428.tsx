import Link from 'next/link';
import React from 'react';
import { useForm } from 'react-hook-form';

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
    formState: { errors },
  } = useForm();

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
      <Button type='submit' className='w-full'>
        Register
      </Button>

      <Link href='/login' className='text-sm text-gray-600 dark:text-gray-400'>
        <Button className='w-full'>Go Back</Button>
      </Link>
    </form>
  );
};

export default RegisterForm;
