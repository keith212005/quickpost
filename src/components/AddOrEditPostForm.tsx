'use client';

import React, { startTransition, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
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
  const queryClient = useQueryClient();

  const isEdit = Boolean(postId);

  const DIALOG_TITLES = {
    edit: 'Edit Post',
    create: 'Create New Post',
  };

  const DIALOG_DESCRIPTIONS = {
    edit: 'Update your post title and content.',
    create: 'Write something new to share with others.',
  };

  const BUTTON_TEXTS = {
    edit: {
      loading: 'Saving...',
      default: 'Save',
    },
    create: {
      loading: 'Posting...',
      default: 'Post',
    },
  };

  const dialogTitle = isEdit ? DIALOG_TITLES.edit : DIALOG_TITLES.create;
  const dialogDescription = isEdit
    ? DIALOG_DESCRIPTIONS.edit
    : DIALOG_DESCRIPTIONS.create;

  const buttonText = isEdit
    ? loading
      ? BUTTON_TEXTS.edit.loading
      : BUTTON_TEXTS.edit.default
    : loading
      ? BUTTON_TEXTS.create.loading
      : BUTTON_TEXTS.create.default;

  const buttonVariant = isEdit ? 'destructive' : undefined;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostSchemaType>({
    resolver: zodResolver(PostSchema),
    defaultValues: { title: title || '', content: content || '' },
  });

  const createMutation = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setLoading(false);
      setOpen(false);
    },
    onError: (error) => {
      console.error('Failed to create post:', error);
      setLoading(false);
    },
  });

  const onSubmit = async (data: PostSchemaType) => {
    setLoading(true);

    if (isEdit) {
      try {
        const response = await updatePost({ postId: postId!, ...data });
        if (!response?.success) {
          setLoading(false);
          return;
        }
        startTransition(() => {
          setOpen(false);
          router.refresh();
        });
        queryClient.invalidateQueries({ queryKey: ['posts'] });
      } catch (error) {
        console.error('Failed to update post:', error);
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      await createMutation.mutateAsync(data);
    } catch (error) {
      console.error('Failed to create post:', error);
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>{isEdit ? 'Edit Post' : 'Add Post'}</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-2xl'>
        <div className='mb-6 flex items-center space-x-2'>
          <span className='h-3 w-3 rounded-full bg-red-500' />
          <span className='h-3 w-3 rounded-full bg-yellow-400' />
          <span className='h-3 w-3 rounded-full bg-green-500' />
        </div>
        <form
          key={postId || 'new'}
          onSubmit={handleSubmit(onSubmit)}
          className='space-y-4'
        >
          <DialogHeader>
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogDescription>{dialogDescription}</DialogDescription>
          </DialogHeader>
          <Input
            placeholder='Title'
            {...register('title')}
            aria-label='Post Title'
          />
          {errors.title && (
            <p className='text-sm text-red-500'>{errors.title.message}</p>
          )}
          <Textarea
            placeholder="What's on your mind?"
            rows={15}
            className='min-h-[300px]'
            {...register('content')}
            aria-label='Post Content'
          />
          {errors.content && (
            <p className='text-sm text-red-500'>{errors.content.message}</p>
          )}
          <DialogFooter>
            <Button
              type='submit'
              disabled={loading}
              variant={buttonVariant}
              className='w-full'
            >
              {buttonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddOrEditPostForm;
