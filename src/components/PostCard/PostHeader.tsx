'use client';

import { Flag, FlagOff, MoreHorizontal } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { formatRelativeTime } from '@/lib/utils';
import { TPostSchema } from '@/types/dbTablesTypes';

import { PostAvatar } from '../PostAvatar';

export default function PostHeader({
  author,
  createdAt,
  dropdownOpen,
  setDropdownOpen,
  hasFlagged,
  onFlag,
  onUnflag,
}: {
  author: Partial<TPostSchema['author']> | null;
  createdAt: string | Date;
  dropdownOpen: boolean;
  setDropdownOpen: (val: boolean) => void;
  hasFlagged: boolean;
  onFlag: () => void;
  onUnflag: () => void;
}) {
  return (
    <div className='flex items-center justify-between px-5 pt-4'>
      <div className='flex items-center gap-3'>
        <PostAvatar name={author?.name || ''} image={author?.image || ''} />
        <div className='flex flex-col'>
          <span className='text-foreground text-sm font-semibold'>
            {author?.name}
          </span>
          <span className='text-muted-foreground text-xs'>
            {formatRelativeTime(new Date(createdAt))}
          </span>
        </div>
      </div>
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger className='hover:bg-muted rounded-full p-1 transition'>
          <MoreHorizontal className='text-muted-foreground h-5 w-5' />
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          {!hasFlagged ? (
            <DropdownMenuItem className='cursor-pointer' onClick={onFlag}>
              <Flag className='mr-2 h-4 w-4' />
              Flag Post
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem className='cursor-pointer' onClick={onUnflag}>
              <FlagOff className='mr-2 h-4 w-4' />
              Unflag Post
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
