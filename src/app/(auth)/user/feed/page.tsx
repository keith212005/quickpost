import { getAllPosts } from '@/app/actions/getAllPosts';
import AddOrEditPostForm from '@/components/AddOrEditPostForm';
import ClientPostFeed from '@/components/ClientPostFeed';

export default async function FeedPage() {
  const { data: posts, error } = await getAllPosts();

  if (error) {
    return (
      <div className='mx-auto max-w-2xl space-y-4 p-4'>
        <h1 className='text-2xl font-bold'>Global Feed</h1>
        <p className='text-gray-500 dark:text-gray-400'>
          {error || 'Something went wrong while fetching posts.'}
        </p>
      </div>
    );
  }

  return (
    <>
      <div className='sticky top-0 z-10 mx-auto flex w-full items-center justify-evenly border-b bg-white p-4 shadow-sm dark:bg-gray-900'>
        <h1 className='text-2xl font-bold'>Global Feed</h1>
        <AddOrEditPostForm />
      </div>
      <ClientPostFeed posts={posts || []} />
    </>
  );
}
