'use client';

import { TPostSchema } from '@/types/dbTablesTypes';

import PostCard from './PostCard';

export default function ClientPostFeed({ posts }: { posts: TPostSchema[] }) {
  return (
    <div className='mx-auto max-w-2xl space-y-4 p-4'>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          edit={false}
          isLikedByUser={post.likes?.some(
            (like) => like.userId === post.author?.id,
          )}
        />
      ))}
    </div>
  );
}
