import { prisma } from '@/lib/db';
import { TPostSchema } from '@/types/dbTablesTypes';

type GetAllPostsResult =
  | { success: true; data: TPostSchema[]; totalCount: number }
  | { success: false; error: string };

export async function getAllPosts(
  take = 50,
  skip = 0,
): Promise<GetAllPostsResult> {
  try {
    const posts: TPostSchema[] = await prisma.post.findMany({
      take,
      skip,
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        tags: true,
        likes: true,
        flags: true,
        comments: true,
        _count: {
          select: {
            comments: true,
            flags: true,
            likes: true,
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
      totalCount,
    };
  } catch (error) {
    console.error('Failed to fetch posts:', (error as Error).message);
    return {
      success: false,
      error: 'Failed to fetch posts.',
    };
  }
}
