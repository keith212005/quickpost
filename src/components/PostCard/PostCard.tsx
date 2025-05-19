'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { flagPost } from '@/app/actions/flagPost';
import { toggleLike } from '@/app/actions/toggleLike';
import { Card } from '@/components/ui/card';
import { TPostSchema } from '@/types/dbTablesTypes';

import FlagPostDialog from './FlagPostDialog';
import PostContent from './PostContent';
import PostFooter from './PostFooter';
import PostHeader from './PostHeader';
import PostTitle from './PostTitle';

type PostCardProps = {
  post: TPostSchema;
  edit?: boolean;
  isLikedByUser?: boolean;
};

export default function PostCard({ post, edit, isLikedByUser }: PostCardProps) {
  const { id, title, content, likes, flags, author, createdAt } = post;
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isFlagDialogOpen, setIsFlagDialogOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isAuthor = session?.user?.id === author?.id;
  const isAdmin = session?.user?.role === 'admin';
  const hasFlagged = flags?.some((flag) => flag.userId === session?.user?.id);

  const handleToggleLike = async () => {
    try {
      await toggleLike(id);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const handleFlagSubmit = async (reason: string) => {
    try {
      const res = await flagPost(id, reason);
      if (!res?.success) throw new Error('Failed to flag post');
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      return true;
    } catch (err) {
      console.error('Error flagging post:', err);
      return false;
    }
  };

  return (
    <>
      <FlagPostDialog
        open={isFlagDialogOpen}
        onClose={() => setIsFlagDialogOpen(false)}
        onSubmit={async (reason) => {
          const success = await handleFlagSubmit(reason);
          if (success) {
            setIsFlagDialogOpen(false);
          }
        }}
      />
      <Card className='border-muted bg-background max-w-full overflow-hidden rounded-xl border shadow hover:shadow-md'>
        <PostHeader
          author={author}
          createdAt={createdAt}
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          hasFlagged={hasFlagged || false}
          onFlag={() => {
            setDropdownOpen(false);
            setIsFlagDialogOpen(true);
          }}
          onUnflag={() => {
            handleFlagSubmit('');
          }}
        />
        <PostTitle title={title} />
        <PostContent
          content={content}
          createdAt={createdAt}
          tags={post.tags}
          isExpanded={isExpanded}
          setIsExpanded={setIsExpanded}
          isLongContent={content.split('\n').length > 5}
        />
        <PostFooter
          likes={likes}
          flags={flags}
          isLikedByUser={isLikedByUser}
          onToggleLike={handleToggleLike}
          edit={edit}
          isAuthor={isAuthor}
          isAdmin={isAdmin}
          postId={id}
          title={title}
          content={content}
          tags={post.tags}
        />
      </Card>
    </>
  );
}
