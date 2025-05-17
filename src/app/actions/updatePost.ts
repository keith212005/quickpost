'use server';

import type { Post } from '@prisma/client';

import { auth } from '@/auth';
import { prisma } from '@/lib/db';

type UpdatePostInput = {
  postId: string;
  title: string;
  content: string;
};

type UpdatePostResult =
  | { success: true; post: Post }
  | { success: false; error: string };

export async function updatePost({
  postId,
  title,
  content,
}: UpdatePostInput): Promise<UpdatePostResult> {
  const session = await auth();
  if (!session) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const post = await prisma.post.update({
      where: { id: postId },
      data: {
        title,
        content,
      },
    });

    return { success: true, post };
  } catch (error) {
    console.error('Failed to update post:', (error as Error).message);
    return { success: false, error: 'Failed to update post' };
  }
}
