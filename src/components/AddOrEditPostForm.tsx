'use client';
import React, { startTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { createPost } from '@/app/actions/createPost';
import { updatePost } from '@/app/actions/updatePost';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
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

    formState: { errors },
  } = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema),
    defaultValues: { title: title || '', content: content || '' },
  });

  const onSubmit = async (data: PostSchemaType) => {
    setLoading(true);

    try {
      if (postId) {
        await updatePost({ postId, ...data });
      } else {
        await createPost(data);
      }
      startTransition(() => {
        setOpen(false);
        router.refresh();
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>{postId ? 'Edit Post' : 'Add Post'}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent className='sm:max-w-2xl'>
        <form
          key={postId || 'new'}
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4'
        >
          <AlertDialogHeader>
            <AlertDialogTitle>
              {postId ? 'Edit Post' : 'Create new Post'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {postId
                ? 'Update your post title and content.'
                : 'Write something new to share with others.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input placeholder='Title' {...register('title')} />
          {errors.title && (
            <p className='text-sm text-red-500'>{errors.title.message}</p>
          )}
          <Textarea
            placeholder='What’s on your mind?'
            rows={15}
            className='min-h-[300px]'
            {...register('content')}
          />
          {errors.content && (
            <p className='text-sm text-red-500'>{errors.content.message}</p>
          )}
          <AlertDialogFooter>
            <AlertDialogCancel type='button'>Cancel</AlertDialogCancel>

            {postId ? (
              <Button type='submit' disabled={loading} variant='destructive'>
                {loading ? 'Saving...' : 'Save'}
              </Button>
            ) : (
              <Button type='submit' disabled={loading}>
                {loading ? 'Posting...' : 'Post'}
              </Button>
            )}
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddOrEditPostForm;
