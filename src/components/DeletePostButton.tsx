'use client';

import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { deletePost } from '@/app/actions/deletedPost';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Button } from './ui/button';

type DeletePostButtonProps = {
  postId: string;
};

const DeletePostButton = ({ postId }: DeletePostButtonProps) => {
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const queryClient = useQueryClient();

  const deleteMutation = useMutation<string, Error, void>({
    mutationFn: () => deletePost({ postId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post deleted successfully');
      setIsDialogOpen(false);
    },
  });

  return (
    <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <AlertDialogTrigger asChild>
        <Button variant='destructive'>Delete</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the post
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={deleteMutation.status === 'pending'}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => deleteMutation.mutate()}
            disabled={deleteMutation.status === 'pending'}
          >
            {deleteMutation.status === 'pending' ? 'Deleting...' : 'Delete'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePostButton;
