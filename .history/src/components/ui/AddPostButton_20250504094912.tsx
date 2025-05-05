import React from 'react';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

import PostForm from '../PostForm';

const AddPostButton = () => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>Add Post</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Create new Post</AlertDialogTitle>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='space-y-4 rounded border p-4 shadow-sm'
          >
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

            <Button type='submit' className='w-full' disabled={loading}>
              {loading ? 'Posting...' : 'Post'}
            </Button>
          </form>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Post</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AddPostButton;
