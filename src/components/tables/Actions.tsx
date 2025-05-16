import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { MoreVerticalIcon, Pencil, User2, UserX } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import { updateUser } from '@/app/actions/updateUser';
import { TUserSchema } from '@/types/dbTablesTypes';

const Actions = ({ user }: { user: TUserSchema }) => {
  const router = useRouter();
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
          <DropdownMenuItem
            className='hover:bg-muted focus:bg-muted flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none'
            onClick={async () => {
              const response = await updateUser({
                userId: user.id,
                role: user.role,
                isActive: !user.isActive,
              });

              if (response.success) {
                toast.success(
                  `User ${!user.isActive ? 'activated' : 'deactivated'}`,
                );
                router.refresh();
              } else {
                console.error('Failed to update user:', response.error);
                toast.error(`Failed to update user`);
              }
            }}
          >
            {user.isActive ? (
              <UserX className='mr-2 h-4 w-4' />
            ) : (
              <User2 className='mr-2 h-4 w-4' />
            )}
            {user.isActive ? 'Deactivate' : 'Activate'}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};

export default Actions;
