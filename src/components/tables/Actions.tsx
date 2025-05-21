'use client';
import React, { startTransition, useState } from 'react';
import { UserRole } from '@prisma/client/edge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { useQueryClient } from '@tanstack/react-query';
import { MoreVerticalIcon, Pencil, User2, UserX } from 'lucide-react';
import { toast } from 'sonner';

import { updateUser } from '@/app/actions/updateUser';
import { TUserSchema } from '@/types/dbTablesTypes';

import { EditUserDialog } from '../layout/EditUserDialog';

type UserActionsProps = {
  user: TUserSchema;
};

type FormData = {
  role: UserRole;
  isActive: string;
};

const Actions = ({ user }: UserActionsProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();

  const handleUpdateUser = async (data: FormData) => {
    console.log('data >>>>>', data);
    const { role, isActive } = data;
    const isActiveBoolean = isActive === 'true'; // convert string to boolean

    try {
      const response = await updateUser({
        userId: user.id,
        role,
        isActive: isActiveBoolean,
      });

      if (response?.success) {
        await queryClient.invalidateQueries({
          queryKey: ['users'],
        });
        toast.success(`User ${!user.isActive ? 'activated' : 'deactivated'}`);
      } else {
        console.error('Failed to update user:', response?.error);
        toast.error(`Failed to update user`);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      toast.error('An unexpected error occurred');
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <>
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
            className='border-border z-[9999] rounded-lg border bg-white p-1 shadow-md dark:bg-zinc-900'
          >
            <DropdownMenuItem
              className='hover:bg-muted focus:bg-muted flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none'
              onClick={() => startTransition(() => setIsOpen(true))}
            >
              <Pencil className='mr-2 h-4 w-4' />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              className='hover:bg-muted focus:bg-muted flex cursor-pointer items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none'
              onClick={() => {
                const isActive = !user.isActive;
                handleUpdateUser({
                  role: user.role,
                  isActive: isActive.toString(),
                });
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
      <EditUserDialog
        isOpen={isOpen}
        onClose={() => startTransition(() => setIsOpen(false))}
        user={user}
        onSubmit={(data) => handleUpdateUser(data)}
      />
    </>
  );
};

export default Actions;
