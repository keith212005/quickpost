import { prisma } from '@/lib/db';
import { TUserSchema } from '@/types/dbTablesTypes';

export async function getAllUsers() {
  const users: TUserSchema[] = await prisma.user.findMany({
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
      posts: true,
      likes: true,
    },
    orderBy: {
      createdAt: 'asc',
    },
  });
  return users;
}
