import { auth } from '@/auth';
import { prisma } from '@/lib/db';
import { TPostSchema } from '@/types/dbTablesTypes';

type GetAllUsersResult =
  | { success: true; data: TPostSchema[]; totalCount: number }
  | { success: false; error: string };

export async function getMyPosts(
  take = 50,
  skip = 0,
): Promise<GetAllUsersResult> {
  const session = await auth();

  try {
    const posts = await prisma.post.findMany({
      take,
      skip,
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
            image: true,
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
      totalCount: posts.length,
    };
  } catch (error) {
    console.error('Failed to fetch posts:', (error as Error).message);
    return {
      success: false,
      error: 'Failed to fetch posts.',
    };
  }
}
