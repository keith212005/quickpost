'use client';

import { Heart } from 'lucide-react';

import { Card } from './ui/card';

type PostCardProps = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author?: {
    name?: string;
    email?: string;
  };
  likes: { id: string }[];
};

export default function PostCard({
  title,
  content,
  createdAt,
  author,
  likes,
}: PostCardProps) {
  return (
    <div className='rounded-lg border p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900'>
      <h2 className='text-lg font-semibold'>{title}</h2>
      <p className='text-sm text-gray-500 dark:text-gray-400'>
        {author?.name ? `By ${author.name} • ` : ''}
        {new Date(createdAt).toLocaleString()}
      </p>
      <p className='mt-2'>{content}</p>
      <div className='mt-4 flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
        <Heart className='h-4 w-4 text-red-500' />
        {likes.length} like{likes.length !== 1 && 's'}
      </div>
    </div>
  );
}
