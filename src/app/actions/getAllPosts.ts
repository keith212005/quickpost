import { prisma } from '@/lib/db';
import { TPostSchema } from '@/types/dbTablesTypes';

export async function getAllPosts() {
  try {
    const posts: TPostSchema[] = await prisma.post.findMany({
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

    console.log('Fetched posts:', posts);

    return {
      success: true,
      data: posts,
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
