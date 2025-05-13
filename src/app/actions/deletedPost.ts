'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/db';

export async function deletePost({ postId }: { postId: string }) {
  const session = await auth();
  if (!session) throw new Error('Unauthorized');

  try {
    await prisma.post.delete({
      where: { id: postId },
    });
  } catch (error) {
    console.error('DELETE failed:', error);
  }

  return postId;
}
