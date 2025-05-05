'use client';
import React from 'react';

import { deletePost } from '@/app/actions/deletedPost';

import { Button } from './ui/button';

type DeletePostButtonProps = {
  postId: string;
};

const DeletePostButton = ({ postId }: DeletePostButtonProps) => {
  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;
    console.log(postId);
    deletePost({ postId });
  };

  return (
    <Button variant='destructive' onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default DeletePostButton;
