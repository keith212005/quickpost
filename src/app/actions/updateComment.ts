'use server';

import { prisma } from '@/lib/db';

export async function updateComment(commentId: string, newContent: string) {
  try {
    const updated = await prisma.comment.update({
      where: { id: commentId },
      data: {
        content: newContent,
        updatedAt: new Date(),
        isEdited: true,
      },
    });

    return {
      success: true,
      data: updated,
    };
  } catch (error) {
    console.error('Failed to update comment:', error);
    return {
      success: false,
      error: 'Something went wrong while updating the comment.',
    };
  }
}
