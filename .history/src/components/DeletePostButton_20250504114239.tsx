'use client';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Button } from './ui/button';

type DeletePostButtonProps = {
  postId: string;
};

const DeletePostButton = ({ postId }: DeletePostButtonProps) => {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm('Are you sure you want to delete this post?');
    if (!confirmed) return;
    console.log(postId);

    const res = await fetch(`/api/post/${postId}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert('Failed to delete post.');
    }
  };

  return (
    <Button variant='destructive' onClick={handleDelete}>
      Delete
    </Button>
  );
};

export default DeletePostButton;
