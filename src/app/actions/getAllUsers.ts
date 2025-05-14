import { prisma } from '@/lib/db';
import { UserType } from '@/types/types';

export async function getAllUsers() {
  const users: UserType[] = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
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
