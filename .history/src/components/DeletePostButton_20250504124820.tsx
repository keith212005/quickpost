'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

import { deletePost } from '@/app/actions/deletedPost';

import { Button } from './ui/button';

type DeletePostButtonProps = {
  postId: string;
};

const DeletePostButton = ({ postId }: DeletePostButtonProps) => {
  const { isDeleting, setIsDeleting } = React.useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;
    console.log(postId);
    await deletePost({ postId });
    router.refresh();
  };

  return (
    <Button variant='destructive' onClick={handleDelete}>
      {isDeleting ? 'Deleting...' : 'Delete'}
    </Button>
  );
};

export default DeletePostButton;
