'use client';

import { CardFooter } from '@/components/ui/card';
import { TPostSchema } from '@/types/dbTablesTypes';

import AddOrEditPostForm from '../AddOrEditPostForm';
import DeletePostButton from '../DeletePostButton';
import { HeartButton } from '../HeartButton';

export default function PostFooter({
  likes,
  flags,
  isLikedByUser,
  onToggleLike,
  edit,
  isAuthor,
  isAdmin,
  postId,
  title,
  content,
  tags,
}: {
  likes: Partial<TPostSchema['likes']> | null[];
  flags: Partial<TPostSchema['flags']> | null[];
  isLikedByUser?: boolean;
  onToggleLike: () => void;
  edit?: boolean;
  isAuthor: boolean;
  isAdmin: boolean;
  postId: string;
  title: string;
  content: string;
  tags?: string[];
}) {
  return (
    <CardFooter className='text-muted-foreground mt-4 flex flex-wrap gap-x-4 gap-y-2 px-5 pt-2 pb-4 text-sm sm:flex-nowrap sm:items-center sm:justify-between'>
      <div className='flex items-center gap-2'>
        <HeartButton
          isLikedByUser={isLikedByUser ?? false}
          onClick={onToggleLike}
        />
        <span>
          {likes?.length === 0
            ? 'Be the first to like this'
            : `${likes?.length} like${likes?.length !== 1 ? 's' : ''}`}
        </span>
      </div>

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
