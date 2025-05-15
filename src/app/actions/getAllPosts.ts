import { prisma } from '@/lib/db';
import { TPostSchema } from '@/types/dbTablesTypes';

export async function getAllPosts(take: number = 50, skip: number = 0) {
  try {
    const posts: TPostSchema[] = await prisma.post.findMany({
      take,
      skip,
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        uploadedAt: true,
        createdAt: true,
        authorId: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        likes: {
          select: {
            id: true,
            userId: true,
            postId: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalCount = await prisma.post.count();

    return {
      success: true,
      data: posts,
      totalCount: totalCount,
      error: undefined,
    };
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return {
      success: false,
      error: 'Failed to fetch posts.',
    };
  }
}
