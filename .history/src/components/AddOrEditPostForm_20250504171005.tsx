'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

import { createPost } from '@/app/actions/createPost';
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

type AddOrEditPostFormProps = {
  postId?: string;
  title?: string;
  content?: string;
};

const AddOrEditPostForm = ({
  postId,
  title,
  content,
}: AddOrEditPostFormProps = {}) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors ,defaultValues({
      title: title || '',
      content: content || '',
    })},
  } = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema),
  });

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>Add Post</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <form
          onSubmit={handleSubmit(async (data) => {
            setLoading(true);
            await createPost(data);
            setOpen(false);
            setLoading(false);
            router.refresh();
          })}
          className='space-y-4'
        >
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

export default AddOrEditPostForm;
