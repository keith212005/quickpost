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
  CardDescription,
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
        <CardDescription className='text-muted-foreground mt-1 text-sm italic'>
          {content.slice(0, 200)}
          {content.length > 200 ? '...' : ''}
        </CardDescription>
        <div className='mt-2 flex items-center gap-3'>
          <Avatar className='h-8 w-8'>
            <AvatarImage
              src={author?.image || ''}
              alt={author?.name || ''}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <AvatarFallback
              style={{
                backgroundColor: `#${intToRGB(hashCode(author?.name || 'U'))}`,
              }}
            >
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

        {new Date().getTime() - new Date(createdAt).getTime() < 86400000 && (
          <span className='inline-block rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800'>
            New
          </span>
        )}

        <div className='mt-3 mb-4 flex flex-wrap gap-2'>
          {(post.tags ?? []).map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className='bg-accent text-accent-foreground hover:bg-muted hover:text-foreground rounded-md px-2 py-1 text-xs font-medium shadow-sm transition'
              title={`View posts tagged with ${tag}`}
            >
              #{tag}
            </span>
          ))}
        </div>

        {isLongContent && (
          <button
            className='mt-2 text-sm font-medium text-blue-600 hover:underline'
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </CardContent>

      <CardFooter className='text-muted-foreground flex flex-col gap-2 pt-2 text-sm md:flex-row md:items-center md:justify-between'>
        <div className='flex items-center gap-2'>
          {HeartIcon}
          <span>
            {likes?.length === 0
              ? 'Be the first to like this'
              : `${likes?.length} like${likes?.length !== 1 ? 's' : ''}`}
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

function hashCode(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return hash;
}

function intToRGB(i: number) {
  const c = (i & 0x00ffffff).toString(16).toUpperCase();
  return '00000'.substring(0, 6 - c.length) + c;
}
