import { prisma } from '@/lib/db';
import { TPostSchema } from '@/types/dbTablesTypes';

export async function getAllPosts(): Promise<{
  success: boolean;
  data?: TPostSchema[];
  error?: string;
}> {
  try {
    const posts = await prisma.post.findMany({
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        uploadedAt: true,
        createdAt: true,
        authorId: true,
        author: true,
        likes: {
          select: {
            id: true,
            userId: true,
            postId: true,
            createdAt: true,
            user: true,
            post: {
              select: {
                id: true,
                title: true,
                content: true,
                published: true,
                uploadedAt: true,
                createdAt: true,
                author: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return {
      success: true,
      data: posts,
    };
  } catch (error) {
    console.error('Failed to fetch posts:', error);
    return {
      success: false,
      error: 'Failed to fetch posts.',
    };
  }
}
