'use client';
import React, { startTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

import { createPost } from '@/app/actions/createPost';
import { updatePost } from '@/app/actions/updatePost';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{postId ? 'Edit Post' : 'Add Post'}</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-2xl'>
        <div className='mb-6 flex items-center space-x-2'>
          <span className='h-3 w-3 rounded-full bg-red-500'></span>
          <span className='h-3 w-3 rounded-full bg-yellow-400'></span>
          <span className='h-3 w-3 rounded-full bg-green-500'></span>
        </div>
        <form
          key={postId || 'new'}
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4'
        >
          <DialogHeader>
            <DialogTitle>
              {postId ? 'Edit Post' : 'Create new Post'}
            </DialogTitle>
            <DialogDescription>
              {postId
                ? 'Update your post title and content.'
                : 'Write something new to share with others.'}
            </DialogDescription>
          </DialogHeader>
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
          <DialogFooter>
            {postId ? (
              <Button
                type='submit'
                disabled={loading}
                variant='destructive'
                className='w-full'
              >
                {loading ? 'Saving...' : 'Save'}
              </Button>
            ) : (
              <Button type='submit' disabled={loading} className='w-full'>
                {loading ? 'Posting...' : 'Post'}
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrEditPostForm;
