'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/db';

export type DeletePostResult =
  | { success: true; postId: string }
  | { success: false; error: string };

export async function deletePost({
  postId,
}: {
  postId: string;
}): Promise<DeletePostResult> {
  const session = await auth();

  console.log('Session:', session);

  if (!session) {
    return { success: false, error: 'Unauthorized' };
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { authorId: true },
  });

  console.log('Post found:', post);

  if (!post) {
    return { success: false, error: 'Post not found' };
  }

  const isAuthor = post.authorId === session.user.id;
  const isAdmin = session.user.role === 'admin';

  console.log('IsAuthor:', isAuthor, 'IsAdmin:', isAdmin);

  if (!isAuthor && !isAdmin) {
    return { success: false, error: 'Unauthorized to delete this post' };
  }

  try {
    await prisma.like.deleteMany({
      where: { postId },
    });

    await prisma.flag.deleteMany({
      where: { postId },
    });

    await prisma.post.delete({
      where: { id: postId },
    });

    console.log('Post deleted:', postId);

    return { success: true, postId };
  } catch (error) {
    console.error('Failed to delete post:', error);
    console.error('Delete error details:', error);
    return {
      success: false,
      error: 'An error occurred while deleting the post. Please try again.',
    };
  }
}
