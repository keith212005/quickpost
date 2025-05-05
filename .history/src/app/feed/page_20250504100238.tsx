import AddPostButton from '@/components/AddPostForm';
import PostCard from '@/components/PostCard';
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
      <div className='sticky top-0 z-10 flex w-xl items-center justify-between border-b bg-white p-4 shadow-sm dark:bg-gray-900'>
        <h1 className='text-2xl font-bold'>Global Feed</h1>
        <AddPostButton />
      </div>
      <div className='mx-auto max-w-2xl space-y-4 p-4'>
        {posts.map((post) => (
          <PostCard key={post.id} {...post} />
        ))}
      </div>
    </>
  );
}
