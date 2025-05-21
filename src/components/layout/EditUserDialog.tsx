'use client';

import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { UserRole } from '@prisma/client/edge';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { TUserSchema } from '@/types/dbTablesTypes';

type FormData = {
  role: UserRole;
  isActive: string;
};

type EditUserDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  user: TUserSchema;
  onSubmit: (data: FormData) => void;
};

export const EditUserDialog = ({
  isOpen,
  onClose,
  user,
  onSubmit,
}: EditUserDialogProps) => {
  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = useForm<FormData>();

  useEffect(() => {
    reset({
      role: user.role,
      isActive: String(user.isActive),
    });
  }, [isOpen, user, reset]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent
        className='transition-all duration-300 ease-in-out sm:max-w-lg'
        aria-describedby='dialog-description'
      >
        <div className='mb-6 flex items-center space-x-2'>
          <span className='h-3 w-3 rounded-full bg-red-500' />
          <span className='h-3 w-3 rounded-full bg-yellow-400' />
          <span className='h-3 w-3 rounded-full bg-green-500' />
        </div>

        <DialogHeader>
          <DialogTitle>Edit User</DialogTitle>
        </DialogHeader>

        <form className='space-y-6' onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Label htmlFor='role'>Role</Label>
            <Select
              defaultValue={user.role}
              onValueChange={(val: UserRole) => setValue('role', val)}
            >
              <SelectTrigger className='mt-2 w-full'>
                <SelectValue placeholder='Select role' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='admin'>Admin</SelectItem>
                <SelectItem value='user'>User</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor='isActive'>Active Status</Label>
            <Select
              defaultValue={user.isActive ? 'true' : 'false'}
              onValueChange={(val: string) => setValue('isActive', val)}
            >
              <SelectTrigger className='mt-2 w-full'>
                <SelectValue placeholder='Select status' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='true'>Active</SelectItem>
                <SelectItem value='false'>Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor='name'>Name</Label>
            <Input
              id='name'
              className='mt-2'
              value={user.name}
              disabled
              aria-describedby='name-desc'
            />
          </div>

          <div>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              className='mt-2'
              value={user.email}
              disabled
              aria-describedby='email-desc'
            />
          </div>

          <div>
            <Label htmlFor='isOAuth'>OAuth User</Label>
            <Input
              id='isOAuth'
              className='mt-2'
              value={user.isOAuth ? 'Yes' : 'No'}
              disabled
              aria-describedby='isOAuth-desc'
            />
          </div>

          <div>
            <Label htmlFor='createdAt'>Created At</Label>
            <Input
              id='createdAt'
              className='mt-2'
              disabled
              value={user.createdAt.toLocaleString()}
              aria-describedby='createdAt-desc'
            />
          </div>

          <div>
            <Label htmlFor='lastLogin'>Last Login</Label>
            <Input
              id='lastLogin'
              className='mt-2'
              disabled
              value={user.lastLogin ? user.lastLogin.toLocaleString() : 'Never'}
              aria-describedby='lastLogin-desc'
            />
          </div>

          <div>
            <Label htmlFor='emailVerified'>Email Verified</Label>
            <Input
              id='emailVerified'
              className='mt-2'
              disabled
              value={
                user.emailVerified
                  ? user.emailVerified.toLocaleString()
                  : 'Not Verified'
              }
              aria-describedby='emailVerified-desc'
            />
          </div>

          <DialogFooter className='mt-6'>
            <DialogClose asChild>
              <Button type='button' variant='outline'>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isSubmitting} type='submit'>
              {isSubmitting ? <Loader2 className='animate-spin' /> : null}
              {isSubmitting ? 'Updating...' : 'Update'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
