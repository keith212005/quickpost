import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

import { prisma } from '@/lib/db';

export async function POST(req: Request) {
  const body = await req.json();
  const { name, email, password } = body;

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(process.env.Database_URL);

  //   const user = await prisma.user.create({
  //     data: {
  //       name,
  //       email,
  //       password: hashedPassword,
  //     },
  //   });

  //   return NextResponse.json({ user });
}
