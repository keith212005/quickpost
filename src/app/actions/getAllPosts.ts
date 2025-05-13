import { auth } from '@/auth';
import { prisma } from '@/lib/db';

export async function getAllPosts() {
  const session = await auth();
  console.log('session in getAllPosts:', session);
  if (!session) {
    return {
      data: [],
      success: false,
      error: 'Unauthorized',
    };
  }
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
