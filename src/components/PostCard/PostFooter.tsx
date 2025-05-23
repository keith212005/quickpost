'use client';

import { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { getComments } from '@/app/actions/getComments';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';
import { CommentButton } from '@/components/ui/CommentButton';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';

import AddOrEditPostForm from '../AddOrEditPostForm';
import DeletePostButton from '../DeletePostButton';
import { HeartButton } from '../HeartButton';

export default function PostFooter({
  isLikedByUser,
  onToggleLikeAction,
  edit,
  isAuthor,
  isAdmin,
  postId,
  title,
  content,
  tags,
  commentCount,
  flagCount,
  likesCount,
  onAddCommentAction,
  onUpdateCommentAction,
  onDeleteCommentAction,
}: {
  isLikedByUser?: boolean;
  onToggleLikeAction: () => void;
  edit?: boolean;
  isAuthor: boolean;
  isAdmin: boolean;
  postId: string;
  title: string;
  content: string;
  tags?: string[];
  commentCount: number;
  flagCount: number;
  likesCount: number;
  onAddCommentAction: (comment: string, commentId?: string) => void;
  onUpdateCommentAction: (commentId: string, comment: string) => void;
  onDeleteCommentAction: (commentId: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [editingComment, setEditingComment] = useState<{
    id: string;
    content: string;
  } | null>(null);
  const [commentText, setCommentText] = useState('');
  const { data: session } = useSession();
  const queryClient = useQueryClient();
  const { data: comments = [], isLoading } = useQuery({
    queryKey: ['comments', postId],
    queryFn: () => getComments(postId),
    enabled: open,
  });

  return (
    <CardFooter className='text-muted-foreground mt-4 flex flex-wrap gap-x-4 gap-y-2 px-5 pt-2 pb-4 text-sm sm:flex-nowrap sm:items-center sm:justify-between'>
      <div className='flex items-center gap-2'>
        <HeartButton
          isLikedByUser={isLikedByUser ?? false}
          onClick={onToggleLikeAction}
        />
        <span>
          {likesCount === 0
            ? 'Be the first to like this'
            : `${likesCount} like${likesCount !== 1 ? 's' : ''}`}
        </span>
      </div>

      {commentCount > 0 && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <CommentButton count={commentCount} />
          </DialogTrigger>
          <DialogContent className='w-full sm:max-w-2xl'>
            <DialogHeader>
              <DialogTitle>Comments</DialogTitle>
            </DialogHeader>
            <div className='mt-4 max-h-72 space-y-4 overflow-y-auto pr-2'>
              {isLoading ? (
                <p className='text-muted-foreground text-sm'>
                  Loading comments...
                </p>
              ) : 'data' in comments && comments.data ? (
                comments.data.map((comment) => (
                  <div
                    key={comment.id}
                    className='bg-background hover:bg-muted rounded-md border px-4 py-3 shadow-sm transition'
                  >
                    <div className='flex items-start justify-between'>
                      <p className='text-foreground text-sm font-semibold'>
                        {comment.author.name}
                      </p>
                      {comment.author.id === session?.user?.id && (
                        <div className='flex gap-2'>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='text-xs text-blue-500 hover:text-blue-600'
                            onClick={() => {
                              setEditingComment({
                                id: comment.id,
                                content: comment.content,
                              });
                              setCommentText(comment.content);
                            }}
                          >
                            Edit
                          </Button>
                          <Button
                            variant='ghost'
                            size='sm'
                            className='text-destructive hover:text-destructive/80 text-xs'
                            onClick={() => {
                              onDeleteCommentAction(comment.id);
                              queryClient.invalidateQueries({
                                queryKey: ['comments'],
                              });
                            }}
                          >
                            Delete
                          </Button>
                        </div>
                      )}
                    </div>
                    <p className='text-muted-foreground mt-1 text-sm whitespace-pre-wrap'>
                      {comment.content}
                    </p>
                  </div>
                ))
              ) : (
                <p className='text-sm text-red-500'>Failed to load comments.</p>
              )}
            </div>
            <div className='mt-4 space-y-2'>
              <Textarea
                placeholder='Write your comment here...'
                rows={3}
                className='h-32 resize-none text-sm'
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
              />
              <Button
                type='button'
                className='w-full sm:w-auto'
                onClick={() => {
                  if (commentText.trim()) {
                    if (editingComment) {
                      onUpdateCommentAction(editingComment.id, commentText);
                    } else {
                      onAddCommentAction(commentText);
                      setOpen(false);
                    }

                    setEditingComment(null);
                    setCommentText('');
                  }
                }}
              >
                {editingComment ? 'Update Comment' : 'Post Comment'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {flagCount > 0 && (
        <div className='text-xs text-red-500 sm:ml-auto'>
          ⚠️ Flagged by {flagCount} user{flagCount > 1 ? 's' : ''}
        </div>
      )}

      {edit && (
        <div className='flex w-full justify-end gap-2 sm:w-auto'>
          {isAuthor && (
            <AddOrEditPostForm
              postId={postId}
              title={title}
              content={content}
              tags={tags}
            />
          )}
          {(isAuthor || isAdmin) && <DeletePostButton postId={postId} />}
        </div>
      )}
    </CardFooter>
  );
}
