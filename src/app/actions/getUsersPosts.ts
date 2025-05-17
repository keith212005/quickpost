import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { TPostSchema } from '@/types/dbTablesTypes';

export async function getUsersPosts(): Promise<{
  success: boolean;
  data?: TPostSchema[];
  error?: string;
}> {
  const session = await auth();

  try {
    const posts = await prisma.post.findMany({
      where: {
        authorId: session?.user?.id,
      },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        updatedAt: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        likes: true,
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
    console.error('Failed to fetch posts:', (error as Error).message);
    return {
      success: false,
      error: 'Failed to fetch posts.',
    };
  }
}
