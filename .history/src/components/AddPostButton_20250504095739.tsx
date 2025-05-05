'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { PostSchema, PostSchemaType } from '@/schemas/postSchema';

import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const AddPostButton = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema),
  });

  const onSubmit = async (data: PostSchemaType) => {
    setLoading(true);
    const res = await fetch('/api/post', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      reset();
      router.refresh();
    } else {
      console.error('Post creation failed');
    }

    setLoading(false);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Add Post</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
          <AlertDialogHeader>
            <AlertDialogTitle>Create new Post</AlertDialogTitle>
          </AlertDialogHeader>
          <Input placeholder='Title' {...register('title')} />
          {errors.title && (
            <p className='text-sm text-red-500'>{errors.title.message}</p>
          )}
          <Textarea
            placeholder='What’s on your mind?'
            rows={4}
            {...register('content')}
          />
          {errors.content && (
            <p className='text-sm text-red-500'>{errors.content.message}</p>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel type='button'>Cancel</AlertDialogCancel>
            <Button type='submit' disabled={loading}>
              {loading ? 'Posting...' : 'Post'}
            </Button>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddPostButton;
