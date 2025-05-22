'use server';

import { auth } from '@/auth';
import { prisma } from '@/lib/db';

type AddCommentParams = {
  postId: string;
  content: string;
  parentId?: string | null;
};

export async function addComment({
  postId,
  content,
  parentId = null,
}: AddCommentParams) {
  // Validate required fields
  if (!postId || !content) {
    return {
      success: false,
      error: 'Missing required fields.',
    };
  }

  const session = await auth();
  const authorId = session?.user?.id;
  if (!authorId) {
    return {
      success: false,
      error: 'Unauthorized',
    };
  }

  try {
    const newComment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId,
        parentId,
      },
    });

    return {
      success: true,
      data: newComment,
    };
  } catch (error) {
    console.error('Failed to add comment:', error);
    return {
      success: false,
      error: 'Something went wrong while adding the comment.',
    };
  }
}
