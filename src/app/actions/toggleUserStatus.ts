'use server';

import { prisma } from '@/lib/db';

export async function toggleUserStatus({
  userId,
  status,
}: {
  userId: string;
  status: boolean;
}): Promise<{ success: boolean; error?: string }> {
  try {
    await prisma.user.update({
      where: { id: userId },
      data: { isActive: !status },
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to toggle status of user:', (error as Error).message);
    return { success: false, error: 'Could not toggle user' };
  }
}
