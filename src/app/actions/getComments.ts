'use server';

import { prisma } from '@/lib/db';
import { TLiteCommentSchema } from '@/types/dbTablesTypes';

type GetAllCommentsResult =
  | { data: TLiteCommentSchema[] }
  | { success: false; error: string };

export async function getComments(
  postId: string,
): Promise<GetAllCommentsResult> {
  try {
    const comments = await prisma.comment.findMany({
      where: {
        postId,
        parentId: null,
      },
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    return {
      data: comments,
    };
  } catch (error) {
    console.error('Failed to fetch comments for post:', error);
    return {
      success: false,
      error: 'Failed to fetch comments',
    };
  }
}
