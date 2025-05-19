'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/db';

export async function flagPost(
  postId: string,
  reason?: string,
): Promise<{ success: boolean; message?: string }> {
  const session = await auth();
  console.log('Session:', session);

  if (!session) return { success: false, message: 'Unauthorized' };

  try {
    console.log(
      'Creating flag for postId:',
      postId,
      'by userId:',
      session.user.id,
      'with reason:',
      reason,
    );

    // Check if user already flagged this post
    const existingFlag = await prisma.flag.findUnique({
      where: {
        postId_userId: {
          postId,
          userId: session.user.id,
        },
      },
    });

    if (existingFlag) {
      await prisma.flag.delete({
        where: {
          postId_userId: {
            postId,
            userId: session.user.id,
          },
        },
      });
      console.log('Existing flag removed (unflagged)');
      return { success: true, message: 'Post unflagged' };
    }

    await prisma.flag.create({
      data: {
        postId,
        userId: session.user.id,
        reason: reason || '',
      },
    });
    console.log('Flag created successfully');

    return { success: true };
  } catch (error) {
    console.error(
      'Flag creation failed for postId:',
      postId,
      'userId:',
      session.user.id,
      'Error:',
      error,
    );
    return { success: false, message: 'Flag creation failed' };
  }
}
