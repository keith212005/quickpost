import PostCard from '@/components/PostCard';
import PostForm from '@/components/PostForm';
import { prisma } from '@/lib/db';

export default async function FeedPage() {
  const posts = await prisma.post.findMany({
    include: {
      author: true,
      likes: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <>
      <div className='sticky top-0 z-10 mt-6 w-full border-b bg-white p-4 shadow-sm dark:bg-gray-900'>
        <PostForm />
      </div>
      <div className='mx-auto max-w-2xl space-y-4 p-4'>
        <h1 className='text-2xl font-bold'>Global Feed</h1>
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  );
}
