'use client';

import { useSession } from 'next-auth/react';

import { TPostSchema } from '@/types/dbTablesTypes';

import PostCard from './PostCard';

export default function ClientPostFeed({ posts }: { posts: TPostSchema[] }) {
  const { data: session } = useSession();
  return (
    <div className='mx-auto max-w-2xl space-y-4 p-4'>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          edit={session?.user?.id === post.author?.id ? true : false}
          isLikedByUser={post.likes?.some(
            (like) => like.userId === session?.user?.id,
          )}
        />
      ))}
    </div>
  );
}
