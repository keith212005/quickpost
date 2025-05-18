import { prisma } from '@/lib/db';
import { TUserSchema } from '@/types/dbTablesTypes';

type GetAllUsersResult =
  | { success: true; data: TUserSchema[]; totalCount: number }
  | { success: false; error: string };

export async function getAllUsers(
  take = 50,
  skip = 0,
): Promise<GetAllUsersResult> {
  try {
    const users = await prisma.user.findMany({
      take,
      skip,
      select: {
        id: true,
        name: true,
        firstName: true,
        lastName: true,
        image: true,
        email: true,
        role: true,
        isOAuth: true,
        isActive: true,
        createdAt: true,
        lastLogin: true,
        emailVerified: true,
        posts: {
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
              },
            },
            likes: true,
          },
        },
        likes: {
          select: {
            post: {
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
                  },
                },
                likes: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const totalCount = await prisma.user.count();

    // Transform likes to be an array of posts
    const mappedUsers = users.map((user) => ({
      ...user,
      likes: user.likes.map((like) => like.post),
    }));

    return { success: true, data: mappedUsers, totalCount };
  } catch (error) {
    console.error('GET USERS failed:', error);
    return { success: false, error: 'Failed to fetch users' };
  }
}
