import MyPostsList from '@/components/MyPostsList';

export default async function MyPosts() {
  return (
    <div className='mx-auto max-w-2xl space-y-4 p-4'>
      <MyPostsList />
    </div>
  );
}
