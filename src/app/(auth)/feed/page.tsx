import AddOrEditPostForm from '@/components/AddOrEditPostForm';
import ClientPostFeed from '@/components/ClientPostFeed';
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

  // convert date to string because Date is not serializable
  const safePosts = posts.map((post) => ({
    ...post,
    createdAt: post.createdAt.toLocaleString(),
    author: post.author
      ? { id: post.author.id, name: post.author.name, email: post.author.email }
      : undefined,
  }));

  return (
    <>
      <div className='sticky top-0 z-10 mx-auto flex w-full items-center justify-evenly border-b bg-white p-4 shadow-sm dark:bg-gray-900'>
        <h1 className='text-2xl font-bold'>Global Feed</h1>
        <AddOrEditPostForm />
      </div>
      <ClientPostFeed posts={safePosts} />
    </>
  );
}
