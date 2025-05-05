'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function MyPosts() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!session?.user?.id) return;
      const res = await fetch(`/api/user/${session.user.id}/posts`);
      const data = await res.json();
      setPosts(data);
      setLoading(false);
    };

    fetchPosts();
  }, [session]);

  if (status === 'loading' || loading) {
    return <div className='p-4'>Loading...</div>;
  }

  if (!session?.user?.id) {
    return <div className='p-4'>You must be logged in to view your posts.</div>;
  }

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
                    router.refresh();
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
