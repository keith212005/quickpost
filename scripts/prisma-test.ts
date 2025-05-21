// import { PrismaClient } from '@prisma/client/edge';
// import { withAccelerate } from '@prisma/extension-accelerate';
import { PrismaClient } from '@prisma/client/edge';

async function main() {
  const prisma = new PrismaClient();

  try {
    const users = await prisma.user.findMany({ take: 1 });
    console.log('✅ Connected to database. Sample user:', users);
  } catch (error) {
    console.error('❌ Could not connect to Prisma DB:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
