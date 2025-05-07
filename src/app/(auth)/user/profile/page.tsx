import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import PostCard from '@/components/PostCard';
import { prisma } from '@/lib/db';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return (
      <div className='p-6 text-center'>
        You must be signed in to view your profile.
      </div>
    );
  }

  const posts = await prisma.post.findMany({
    where: { authorId: session.user.id },
    orderBy: { createdAt: 'desc' },
    include: { likes: true },
  });

  return (
    <div className='mx-auto max-w-2xl space-y-4 p-4'>
      {posts.map((post) => (
        <PostCard
          edit={true}
          key={post.id}
          id={post.id}
          title={post.title}
          content={post.content}
          createdAt={post.createdAt.toLocaleString()}
          likes={post.likes}
          isLikedByUser={post.likes?.some(
            (like) => like.userId === post.authorId,
          )}
        />
      ))}
    </div>
  );
}
