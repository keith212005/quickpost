import { getServerSession } from 'next-auth';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { prisma } from '@/lib/db';

import { authOptions } from '../api/auth/[...nextauth]/route';

export default async function MyPosts() {
  const session = await getServerSession(authOptions);
  console.log('session>>>>>>>>>>>>>', session);

  if (!session?.user?.id) {
    return <div className='p-4'>You must be logged in to view your posts.</div>;
  }

  const posts = await prisma.post.findMany({
    where: {
      authorId: session.user.id,
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
          <Card key={post.id}>
            <CardHeader>
              <CardTitle>{post.title}</CardTitle>
              <CardDescription>
                {new Date(post.createdAt).toLocaleString()}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>{post.content}</p>
            </CardContent>
            <CardFooter className='flex justify-end gap-2'>
              <Button variant='outline'>Edit</Button>
              <Button
                variant='destructive'
                onClick={async () => {
                  const confirmed = confirm(
                    'Are you sure you want to delete this post?',
                  );
                  if (!confirmed) return;

                  const res = await fetch(`/api/post/${post.id}`, {
                    method: 'DELETE',
                  });

                  if (res.ok) {
                    window.location.reload(); // or use router.refresh() if you're using App Router
                  } else {
                    alert('Failed to delete the post.');
                  }
                }}
              >
                Delete
              </Button>
            </CardFooter>
          </Card>
        ))
      )}
    </div>
  );
}
