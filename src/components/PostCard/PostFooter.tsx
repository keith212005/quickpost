'use client';

import { CardFooter } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { TPostSchema } from '@/types/dbTablesTypes';

import AddOrEditPostForm from '../AddOrEditPostForm';
import DeletePostButton from '../DeletePostButton';
import { HeartButton } from '../HeartButton';

export default function PostFooter({
  likes,
  flags,
  isLikedByUser,
  onToggleLikeAction,
  edit,
  isAuthor,
  isAdmin,
  postId,
  title,
  content,
  tags,
  comments,
}: {
  likes: Partial<TPostSchema['likes']> | null[];
  flags: Partial<TPostSchema['flags']> | null[];
  isLikedByUser?: boolean;
  onToggleLikeAction: () => void;
  edit?: boolean;
  isAuthor: boolean;
  isAdmin: boolean;
  postId: string;
  title: string;
  content: string;
  tags?: string[];
  comments?: Partial<TPostSchema['comments']> | null[];
}) {
  console.log('comments >>>>>>', comments);
  return (
    <CardFooter className='text-muted-foreground mt-4 flex flex-wrap gap-x-4 gap-y-2 px-5 pt-2 pb-4 text-sm sm:flex-nowrap sm:items-center sm:justify-between'>
      <div className='flex items-center gap-2'>
        <HeartButton
          isLikedByUser={isLikedByUser ?? false}
          onClick={onToggleLikeAction}
        />
        <span>
          {likes?.length === 0
            ? 'Be the first to like this'
            : `${likes?.length} like${likes?.length !== 1 ? 's' : ''}`}
        </span>
      </div>

      {comments && comments.length > 0 && (
        <Dialog>
          <DialogTrigger className='text-muted-foreground mt-2 w-full text-left text-xs sm:ml-auto sm:w-auto'>
            💬 {comments.length} comment{comments.length !== 1 ? 's' : ''}
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Comments</DialogTitle>
            </DialogHeader>
            <div className='mt-2 max-h-60 space-y-2 overflow-y-auto text-sm'>
              {comments.map((comment) => (
                <div key={comment?.id}>
                  <strong>{comment?.author?.name}</strong>: {comment?.content}
                </div>
              ))}
            </div>
            <div className='mt-4 space-y-2'>
              <textarea
                className='focus:ring-primary w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring'
                placeholder='Write a comment...'
                rows={3}
              />
              <button className='bg-primary hover:bg-primary/90 rounded-md px-4 py-2 text-sm text-white'>
                Post Comment
              </button>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {flags && flags?.length > 0 && (
        <div className='text-xs text-red-500 sm:ml-auto'>
          ⚠️ Flagged by {flags.length} user{flags.length > 1 ? 's' : ''}
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
