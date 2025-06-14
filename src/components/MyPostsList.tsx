'use client';

import { useEffect, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { usePaginatedQuery } from '@/hooks/usePaginatedQuery';
import { TPostSchema } from '@/types/dbTablesTypes';

import { NoPostFound } from './NoPostFound';
import PostCard from './PostCard/PostCard';
import PostSkeleton from './skeletons/PostSkeleton';
import { Paginate } from './ui/Paginate';

export default function MyPostsList() {
  const { data: session } = useSession();
  const [page, setPage] = useState(1);
  const queryClient = useQueryClient();

  const { isPending, data } = usePaginatedQuery(
    ['myPost', page],
    () => fetch(`/api/getMyPosts?page=${page}`).then((res) => res.json()),
    page,
    {},
  );

  useEffect(() => {
    const handler = () => {
      queryClient.invalidateQueries({ queryKey: ['myPost'] });
    };

    window.addEventListener('post-created', handler);
    return () => window.removeEventListener('post-created', handler);
  }, [queryClient]);

  const posts: TPostSchema[] = data?.data ?? [];
  const totalPages: number = data?.totalPages ?? 1;

  const pagination = (
    <Paginate page={page} totalPages={totalPages} setPage={setPage} />
  );
  console.log('Posts response:', data);

  return (
    <div className='mx-auto max-w-2xl space-y-6 p-4'>
      {isPending ? (
        <PostSkeleton />
      ) : posts.length === 0 ? (
        <NoPostFound />
      ) : (
        <>
          {pagination}
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              edit={session?.user?.id === post.author?.id}
              isLikedByUser={post.likes?.some(
                (like) => like.userId === session?.user?.id,
              )}
            />
          ))}
          {pagination}
        </>
      )}
    </div>
  );
}
