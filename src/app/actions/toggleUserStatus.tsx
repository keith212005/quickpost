'use server';
import { prisma } from '@/lib/db';

export async function toggleUserStatus({
  userId,
  status,
}: {
  userId: string;
  status: boolean;
}) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { isActive: !status },
    });
    return user;
  } catch (error) {
    console.error('Failed to toggle status of user:', error);
    throw new Error('Could not toggle user');
  }
}
