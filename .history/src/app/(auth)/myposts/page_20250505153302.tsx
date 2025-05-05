import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import PostCard from '@/components/PostCard';
import { prisma } from '@/lib/db';

export default async function MyPosts() {
  const session = await getServerSession(authOptions);

  const posts = await prisma.post.findMany({
    where: {
      authorId: session?.user?.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className='mx-auto max-w-2xl space-y-4 p-4'>
      <h1 className='text-2xl font-bold'>My Posts</h1>
      {posts.length === 0 ? (
        <p className='text-gray-500 dark:text-gray-400'>
          You haven’t created any posts yet.
        </p>
      ) : (
        posts.map((post) => (
          <PostCard
            edit={true}
            key={post.id}
            id={post.id}
            title={post.title}
            content={post.content}
            createdAt={post.createdAt.toLocaleString()}
          />
        ))
      )}
    </div>
  );
}
