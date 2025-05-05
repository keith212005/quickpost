'use client';

import { useRouter } from 'next/navigation';

import { toggleLike } from '@/app/actions/toggleLike';
import { TPostSchema } from '@/types/dbTablesTypes';

import PostCard from './PostCard';

export default function ClientPostFeed({ posts }: { posts: TPostSchema[] }) {
  const router = useRouter();

  const handleLike = async (postId: string) => {
    try {
      await toggleLike(postId);
      router.refresh();
      console.log('Toggled like');
      // Optional: revalidate or refresh the component data here
    } catch (error) {
      console.error('Error toggling like:', error);
    }
  };

  return (
    <div className='mx-auto max-w-2xl space-y-4 p-4'>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          createdAt={post.createdAt}
          author={
            post.author
              ? { name: post.author.name, email: post.author.email }
              : undefined
          }
          likes={post.likes}
          onClickLike={() => handleLike(post.id)}
          isLikedByUser={post.likes?.some(
            (like) => like.userId === post.author?.id,
          )}
        />
      ))}
    </div>
  );
}
