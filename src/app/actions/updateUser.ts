'use server';

import type { UserRole } from '@prisma/client/edge';

import { prisma } from '@/lib/db';

export async function updateUser({
  userId,
  role,
  isActive,
}: {
  userId: string;
  role: UserRole;
  isActive: boolean;
}): Promise<{
  success: boolean;
  data?: unknown;
  error?: string;
}> {
  console.log('Incoming updateUser request', { userId, role, isActive });
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role, isActive },
    });

    console.log(`User ${userId} updated successfully.`);
    return { success: true, data: user };
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`Failed to update user ${userId}:`, message);
    return {
      success: false,
      error: 'Failed to update user.',
    };
  }
}
