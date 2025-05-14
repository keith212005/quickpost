import { getUsersPosts } from '@/app/actions/getUsersPosts';
import { auth } from '@/auth';
import PostCard from '@/components/PostCard';

export default async function MyPosts() {
  const { data: posts } = await getUsersPosts();
  const session = await auth();

  return (
    <div className='mx-auto max-w-2xl space-y-4 p-4'>
      <h1 className='text-2xl font-bold'>My Posts</h1>
      {posts?.length === 0 ? (
        <p className='text-gray-500 dark:text-gray-400'>
          You haven’t created any posts yet.
        </p>
      ) : (
        posts?.map((post) => (
          <PostCard
            key={post.id}
            post={post}
            edit={session?.user?.id === post.author?.id ? true : false}
            isLikedByUser={post.likes?.some(
              (like) => like.userId === post.author?.id,
            )}
          />
        ))
      )}
    </div>
  );
}
