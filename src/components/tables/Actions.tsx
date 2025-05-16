import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { MoreVerticalIcon, Pencil, UserX } from 'lucide-react';

const Actions = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='hover:bg-muted flex h-8 w-8 items-center justify-center rounded-md'>
          <MoreVerticalIcon className='h-4 w-4' />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          align='end'
          side='bottom'
          //   sideOffset={4}
          className='border-border z-[9999] rounded-lg border bg-white p-1 shadow-md dark:bg-zinc-900'
        >
          <DropdownMenuItem className='hover:bg-muted focus:bg-muted flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none'>
            <Pencil className='mr-2 h-4 w-4' />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className='hover:bg-muted focus:bg-muted flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none'>
            <UserX className='mr-2 h-4 w-4' />
            Deactivate
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default Actions;
