// prisma/seed.ts
import { faker } from '@faker-js/faker';
import { PrismaClient, UserRole } from '@prisma/client/edge';

import { TPostSchema } from '@/types/dbTablesTypes';
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding...');

  // 1. Create Users
  const userCount = 10;
  const users = await Promise.all(
    Array.from({ length: userCount }).map(() =>
      prisma.user.create({
        data: {
          name: faker.internet.username(),
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
          email: faker.internet.email(),
          password: faker.internet.password(),
          isOAuth: false,
          isActive: true,
          image: faker.image.avatar(),
          emailVerified: faker.datatype.boolean() ? faker.date.recent() : null,
          lastLogin: faker.date.recent(),
          role: faker.helpers.arrayElement([UserRole.user, UserRole.admin]),
        },
      }),
    ),
  );

  // 2. Create Posts
  const posts: TPostSchema[] = [];
  for (const user of users) {
    const postCount = faker.number.int({ min: 1, max: 2 });

    for (let i = 0; i < postCount; i++) {
      const post = await prisma.post.create({
        data: {
          title: faker.lorem.sentence(),
          content: faker.lorem.paragraphs(1),
          published: true,
          authorId: user.id,
          tags: Array.from(
            { length: faker.number.int({ min: 1, max: 3 }) },
            () => faker.hacker.noun().toLowerCase(),
          ),
        },
      });

      posts.push({
        ...post,
        author: {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
        },
      });
    }
  }

  // 3. Create Likes
  for (const post of posts) {
    const numLikes = faker.number.int({ min: 0, max: 2 });
    const likedBy = faker.helpers.arrayElements(users, numLikes);

    for (const user of likedBy) {
      try {
        await prisma.like.create({
          data: {
            userId: user.id,
            postId: post.id,
          },
        });
      } catch (e) {
        // Avoid unique constraint errors
        console.log(e);
      }
    }
  }

  // 4. Create Flags
  for (const post of posts) {
    const shouldFlag = faker.datatype.boolean();
    if (shouldFlag) {
      const flagger = faker.helpers.arrayElement(users);
      try {
        await prisma.flag.create({
          data: {
            postId: post.id,
            userId: flagger.id,
            reason: faker.lorem.sentence(),
          },
        });
      } catch (e) {
        console.log('Flag creation error:', e);
      }
    }
  }

  console.log('✅ Done seeding!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
