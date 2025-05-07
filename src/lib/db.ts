import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const prisma = new PrismaClient().$extends(withAccelerate());

// import { PrismaClient } from '@prisma/client';
// export const prisma = new PrismaClient();
