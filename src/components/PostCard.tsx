'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { toggleLike } from '@/app/actions/toggleLike';
import {
  Card,
  CardContent,
  CardDescription,
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

  const router = useRouter();
  const handleToggleLike = async () => {
    try {
      await toggleLike(id);
      router.refresh();
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const maxLines = 5;
  const isLongContent = content.split('\n').length > maxLines;

  return (
    <Card>
      <CardHeader className='space-y-2'>
        <CardTitle className='text-xl leading-snug font-semibold'>
          {title}
        </CardTitle>
        <CardDescription className='text-muted-foreground text-sm'>
          {author?.name ? `By ${author.name} • ` : ''}
          {createdAt.toLocaleString()}
        </CardDescription>
      </CardHeader>

      <CardContent className='prose dark:prose-invert max-w-none text-sm leading-relaxed text-gray-700 dark:text-gray-300'>
        <pre
          className={`break-words whitespace-pre-wrap ${
            !isExpanded && isLongContent ? 'line-clamp-[5]' : ''
          }`}
        >
          {content}
        </pre>
        {isLongContent && (
          <button
            className='mt-2 text-sm text-blue-500 hover:underline'
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? 'Show less' : 'Read more'}
          </button>
        )}
      </CardContent>
      <CardFooter className='flex items-center justify-between text-sm text-gray-600 dark:text-gray-300'>
        <div className='flex items-center gap-2'>
          {isLikedByUser ? (
            <motion.div
              whileTap={{ scale: 1.3 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Heart
                className='h-4 w-4 cursor-pointer fill-red-500 text-red-500'
                onClick={handleToggleLike}
              />
            </motion.div>
          ) : (
            <motion.div
              whileTap={{ scale: 1.3 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Heart
                className='h-4 w-4 cursor-pointer text-red-500'
                onClick={handleToggleLike}
              />
            </motion.div>
          )}
          <span>
            {likes?.length} like{likes?.length !== 1 && 's'}
          </span>
        </div>
        {edit && (
          <div className='ml-auto flex gap-2'>
            {session?.user?.id === author?.id && (
              <AddOrEditPostForm postId={id} title={title} content={content} />
            )}
            <DeletePostButton postId={id} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
