import {
  PrismaClient,
  PrismaClient as StandardPrismaClient,
} from '@prisma/client';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient;
};

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  (async () => {
    const { PrismaClient } = await import('@prisma/client/edge');
    const { withAccelerate } = await import('@prisma/extension-accelerate');
    prisma = new PrismaClient().$extends(
      withAccelerate(),
    ) as unknown as PrismaClient;
    // Only export after dynamic import
    globalForPrisma.prisma = prisma;
  })();
} else {
  prisma =
    globalForPrisma.prisma ??
    new StandardPrismaClient({
      log: ['query'],
    });

  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = prisma;
  }
}

export { prisma };
