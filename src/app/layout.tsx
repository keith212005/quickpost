import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { SessionProvider } from 'next-auth/react';

import { auth } from '@/auth';
import Navbar from '@/components/layout/NavBar';
import { ThemeProvider } from '@/components/ThemeProvider';
import { Toaster } from '@/components/ui/sonner';
import { ReactQueryProvider } from '@/providers/ReactQueryProvider';

import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Quick Post',
  description: 'Post, edit, and share your thoughts instantly with Quick Post.',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session ?? null}>
            <ReactQueryProvider>
              <div className='bg-background sticky top-0 z-50'>
                <Navbar />
              </div>
              <div className='flex'>
                <main className='flex-1'>{children}</main>
              </div>
              <Toaster position='top-center' />
            </ReactQueryProvider>
          </SessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
