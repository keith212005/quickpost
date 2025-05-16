'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/db';

export async function toggleLike(postId: string) {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error('Unauthorized');
  }

  const userId = session.user.id;

  try {
    const existing = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    if (existing) {
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
      return { liked: false };
    } else {
      await prisma.like.create({
        data: {
          userId,
          postId,
        },
      });
      console.log('👍 Like created for', postId, 'by', userId);
      return { liked: true };
    }
  } catch (error) {
    console.error('Error toggling like:', error);
    throw new Error('Unable to toggle like');
  }
}
