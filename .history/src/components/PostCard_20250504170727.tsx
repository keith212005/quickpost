'use client';

import { Heart } from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import AddOrEditPostForm from './AddOrEditPostForm';
import DeletePostButton from './DeletePostButton';
import { Button } from './ui/button';

type PostCardProps = {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  author?: {
    name?: string;
    email?: string;
  };
  likes?: { id: string }[];
  edit?: boolean;
};

export default function PostCard({
  id,
  title,
  content,
  createdAt,
  author,
  likes,
  edit,
}: PostCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          {author?.name ? `By ${author.name} • ` : ''}
          {createdAt}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>{content}</p>
      </CardContent>
      <CardFooter className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300'>
        <Heart className='h-4 w-4 text-red-500' />
        {likes?.length} like{likes?.length !== 1 && 's'}
        {edit && (
          <div className='ml-auto flex gap-2'>
            <AddOrEditPostForm id={id} title={title} content={content} />
            <DeletePostButton postId={id} />
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
