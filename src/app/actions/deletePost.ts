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
  if (!session || !session.user?.id || !session.user?.role) {
    return { success: false, error: 'Unauthorized or malformed session' };
  }

  const post = await prisma.post.findUnique({
    where: { id: postId },
    select: { authorId: true },
  });

  if (!post || post.authorId === null) {
    return { success: false, error: 'Post not found' };
  }

  const userId = session.user.id;
  const userRole = session.user.role;
  const isAuthor = post.authorId === userId;
  const isAdmin = userRole === 'admin';

  if (!isAuthor && !isAdmin) {
    return { success: false, error: 'Unauthorized to delete this post' };
  }

  try {
    await prisma.post.delete({
      where: { id: postId },
    });

    return { success: true, postId };
  } catch (error) {
    console.error('Failed to delete post:', {
      error,
      postId,
      attemptedBy: userId,
      isAdmin,
    });

    return {
      success: false,
      error: 'An error occurred while deleting the post. Please try again.',
    };
  }
}
