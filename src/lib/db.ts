// import { PrismaClient } from '@prisma/client/edge';
import { PrismaClient } from '@prisma/client';
// export const prisma = new PrismaClient().$extends(withAccelerate());
// import { PrismaClient } from '@prisma/client';
// export const prisma = new PrismaClient();

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
