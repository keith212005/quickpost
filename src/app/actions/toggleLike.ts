'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/db';

export async function toggleLike(postId: string): Promise<{ liked: boolean }> {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const userId = session.user.id;

  try {
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: { userId, postId },
      },
    });

    if (existingLike) {
      await prisma.like.delete({
        where: {
          userId_postId: { userId, postId },
        },
      });
      return { liked: false };
    }

    await prisma.like.create({
      data: { userId, postId },
    });

    return { liked: true };
  } catch (error) {
    console.error('Error toggling like:', (error as Error).message);
    throw new Error('Unable to toggle like');
  }
}
