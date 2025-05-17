'use server';

import bcrypt from 'bcryptjs';

import { prisma } from '@/lib/db';
import { TUserSchema } from '@/types/dbTablesTypes';

type RegisterUserResult = {
  user?: Pick<TUserSchema, 'id' | 'name' | 'email'>;
  error?: string;
};

export async function registerUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
): Promise<RegisterUserResult> {
  try {
    const existingUser = await prisma.user.findUnique({ where: { email } });

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
  } catch (error) {
    console.error('Error creating user:', (error as Error).message);
    return { error: 'Failed to create user. Please try again.' };
  }
}
