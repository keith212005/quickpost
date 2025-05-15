'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';

import { TPostSchema } from '@/types/dbTablesTypes';

import PostCard from './PostCard';
import PostSkeleton from './skeletons/PostSkeleton';
import { Paginate } from './ui/Paginate';

export default function ClientPostFeed() {
  const { data: session } = useSession();
  const [posts, setPosts] = useState<TPostSchema[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const res = await fetch(`/api/posts?page=${page}`);
      const json = await res.json();
      setPosts(json.data || []);
      setTotalPages(json.totalPages || 1); // your API must return this
      setLoading(false);
    };

    fetchPosts();
  }, [page]);

  return (
    <div className='mx-auto max-w-2xl space-y-6 p-4'>
      <Paginate page={page} totalPages={totalPages} setPage={setPage} />
      {loading ? (
        <PostSkeleton />
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            edit={session?.user?.id === post.author?.id}
            isLikedByUser={post.likes?.some(
              (like) => like.userId === session?.user?.id,
            )}
          />
        ))
      )}

      <Paginate page={page} totalPages={totalPages} setPage={setPage} />
    </div>
  );
}
