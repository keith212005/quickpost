import AddOrEditPostForm from '@/components/AddOrEditPostForm';
import ClientPostFeed from '@/components/AllPostsList';

export default async function FeedPage() {
  return (
    <>
      <div className='sticky top-0 z-10 mx-auto flex w-full items-center justify-evenly border-b bg-white p-4 shadow-sm dark:bg-gray-900'>
        <h1 className='text-2xl font-bold'>Global Feed</h1>
        <AddOrEditPostForm />
      </div>
      <ClientPostFeed />
    </>
  );
}
