'use server';

import bcrypt from 'bcryptjs';

import { prisma } from '@/lib/db';
import { UserType } from '@/types/types';

export async function registerUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
): Promise<{ user?: Partial<UserType>; error?: string }> {
  try {
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return { error: 'User already exists with this email.' };
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name: `${firstName} ${lastName}`,
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: 'user',
        isActive: true,
      },
    });
    return {
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  } catch (error: unknown) {
    console.error('Error creating user:', error);
    return { error: 'Failed to create user. Please try again.' };
  }
}
