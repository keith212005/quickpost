'use server';

import { prisma } from '@/lib/db';

export async function deleteComment(commentId: string) {
  try {
    await prisma.comment.delete({
      where: { id: commentId },
    });

    return {
      success: true,
      message: 'Comment deleted successfully.',
    };
  } catch (error) {
    console.error('Failed to delete comment:', error);
    return {
      success: false,
      error: 'Something went wrong while deleting the comment.',
    };
  }
}
