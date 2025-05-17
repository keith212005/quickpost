'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/db';

type DeletePostResult =
  | { success: true; postId: string }
  | { success: false; error: string };

export async function deletePost({
  postId,
}: {
  postId: string;
}): Promise<DeletePostResult> {
  const session = await auth();
  if (!session) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    await prisma.post.delete({
      where: { id: postId },
    });
    return { success: true, postId };
  } catch (error) {
    console.error('DELETE failed:', error);
    return {
      success: false,
      error: 'An error occurred while deleting the post. Please try again.',
    };
  }
}
