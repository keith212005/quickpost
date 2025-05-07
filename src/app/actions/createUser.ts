'use server';

import bcrypt from 'bcryptjs';

import { prisma } from '@/lib/db';
import { UserType } from '@/types/types';

export async function createUser(
  name: string,
  email: string,
  password: string,
): Promise<{ user?: Partial<UserType>; error?: string }> {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'user',
        isActive: true,
      },
    });
    return { user };
  } catch (error: unknown) {
    console.error('Error creating user:', error);
    return { error: 'Failed to create user. Please try again.' };
  }
}
