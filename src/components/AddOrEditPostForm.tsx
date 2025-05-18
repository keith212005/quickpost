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

import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { postFormSchema, TPostFormSchema } from '@/types/dbTablesTypes';

type AddOrEditPostFormProps = Partial<TPostFormSchema> & {
  postId?: string;
};

const AddOrEditPostForm = ({
  postId,
  title,
  content,
  tags,
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
  } = useForm<TPostFormSchema>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: title || '',
      content: content || '',
      tags: Array.isArray(tags) ? tags : [tags ?? ''],
    },
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

  const onSubmit = async (data: TPostFormSchema) => {
    console.log('data >>>>>', data.tags);
    console.log('data >>>>>', typeof data.tags);

    setLoading(true);

    const normalizedTags =
      typeof data.tags === 'string'
        ? (data.tags as string)
            .split(',')
            .map((tag) => tag.trim().toLowerCase())
            .filter(Boolean)
        : Array.isArray(data.tags)
          ? data.tags.map((tag) => tag.trim().toLowerCase()).filter(Boolean)
          : [];

    const postData = {
      title: data.title,
      content: data.content,
      tags: normalizedTags,
    };

    if (isEdit) {
      try {
        const response = await updatePost({ postId: postId!, ...postData });
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
      await createMutation.mutateAsync(postData);
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
          onSubmit={handleSubmit(onSubmit, (errors) => {
            console.warn('Form validation failed:', errors);
          })}
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
          <div>
            <Input
              placeholder='e.g. react, typescript, webdev'
              {...register('tags', {
                setValueAs: (v) =>
                  typeof v === 'string'
                    ? v
                        .split(',')
                        .map((tag) => tag.trim().toLowerCase())
                        .filter(Boolean)
                    : [],
              })}
              aria-label='Post Tags'
              className='text-sm'
            />
            <p className='text-muted-foreground mt-1 text-xs'>
              Separate tags with commas (e.g. react, typescript, ui)
            </p>
            {errors.tags && (
              <p className='mt-1 text-sm text-red-500'>{errors.tags.message}</p>
            )}
          </div>
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
