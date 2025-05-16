'use server';

import { UserRole } from '@prisma/client';

import { prisma } from '@/lib/db';

export async function updateUser({
  userId,
  role,
  isActive,
}: {
  userId: string;
  role: UserRole;
  isActive: boolean;
}) {
  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: { role, isActive },
    });

    console.log(`User ${userId} updated successfully.`);
    return { success: true, data: user };
  } catch (error) {
    console.error(`Failed to update user ${userId}:`, error);
    return {
      success: false,
      error: 'An error occurred while updating the user. Please try again.',
    };
  }
}
