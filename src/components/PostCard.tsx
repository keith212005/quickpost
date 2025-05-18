'use client';

import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useSession } from 'next-auth/react';

import { toggleLike } from '@/app/actions/toggleLike';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TPostSchema } from '@/types/dbTablesTypes';

import AddOrEditPostForm from './AddOrEditPostForm';
import DeletePostButton from './DeletePostButton';

type PostCardProps = {
  post: TPostSchema;
  edit?: boolean;
  isLikedByUser?: boolean;
};

export default function PostCard({ post, edit, isLikedByUser }: PostCardProps) {
  const { id, title, content, likes, author, createdAt } = post;
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const handleToggleLike = async () => {
    try {
      await toggleLike(id);
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const maxLines: number = 5;
  const isLongContent: boolean = content.split('\n').length > maxLines;
  const isAuthor = session?.user?.id === author?.id;

  const HeartIcon = (
    <motion.div
      whileTap={{ scale: 1.3 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <Heart
        className={`h-4 w-4 cursor-pointer text-red-500 ${isLikedByUser ? 'fill-red-500' : ''}`}
        onClick={handleToggleLike}
      />
    </motion.div>
  );

  return (
    <Card className='border-muted bg-background rounded-lg border shadow-sm transition-shadow hover:shadow-md'>
      <CardHeader className='pb-1'>
        <CardTitle className='text-foreground text-lg font-semibold'>
          {title}
        </CardTitle>
        <div className='mt-2 flex items-center gap-3'>
          <Avatar className='h-8 w-8'>
            <AvatarImage
              src={author?.image || ''}
              alt={author?.name || ''}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <AvatarFallback>
              {author?.name
                ?.split(' ')
                .map((n) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2) || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col justify-center'>
            <div className='text-foreground text-sm font-medium'>
              {author?.name}
            </div>
            <time
              className='text-muted-foreground text-xs'
              dateTime={new Date(createdAt).toISOString()}
            >
              {new Date(createdAt).toLocaleString(undefined, {
                dateStyle: 'long',
                timeStyle: 'short',
              })}
            </time>
          </div>
        </div>
      </CardHeader>

      <CardContent className='text-muted-foreground mt-2 text-base leading-7 font-normal tracking-wide whitespace-pre-wrap'>
        <div
          className={`overflow-hidden ${!isExpanded && isLongContent ? 'line-clamp-5' : ''}`}
        >
          {content}
        </div>

        <div className='mt-3 flex flex-wrap gap-2'>
          {(post.tags ?? []).map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className='bg-accent text-accent-foreground hover:bg-accent/70 rounded-md px-2 py-1 text-xs font-medium shadow-sm transition'
            >
              #{tag}
            </span>
          ))}
        </div>

        {isLongContent && (
          <button
            className='text-primary mt-2 text-sm font-medium hover:underline'
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </CardContent>

      <CardFooter className='text-muted-foreground flex items-center justify-between pt-2 text-sm'>
        <div className='flex items-center gap-2'>
          {HeartIcon}
          <span>
            {likes?.length} like{likes?.length !== 1 && 's'}
          </span>
        </div>

        {edit && isAuthor && (
          <div className='ml-auto flex gap-2'>
            <AddOrEditPostForm
              postId={id}
              title={title}
              content={content}
              tags={post.tags}
            />
            <DeletePostButton postId={id} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
