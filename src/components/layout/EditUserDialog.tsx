'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { updateUser } from '@/app/actions/updateUser';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Dialog,
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
import { UserType } from '@/types/types';

type FormData = {
  role: string;
  isActive: string;
};

type EditUserDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  user: UserType;
};

export const EditUserDialog = ({
  isOpen,
  onClose,
  user,
}: EditUserDialogProps) => {
  const router = useRouter();
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

  const onSubmit = async (
    data: { role: string; isActive: string }, // treat isActive as string from form
  ) => {
    console.log('Submitted Data:', data.isActive);
    console.log('Submitted Data:', typeof data.isActive);

    if (!data.role) {
      console.error('Role is required');
      return;
    }

    try {
      await updateUser({
        userId: user.id,
        role: data.role,
        isActive: data.isActive === 'true', // convert string to boolean
      });

      onClose();
      router.refresh();
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='sm:max-w-lg'>
        <Card className='m-2'>
          <CardHeader>
            <DialogHeader>
              <DialogTitle>Edit User</DialogTitle>
            </DialogHeader>
          </CardHeader>
          <CardContent>
            <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label htmlFor='role'>Role</Label>
                <Select
                  defaultValue={user.role}
                  onValueChange={(val) => setValue('role', val)}
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
                  onValueChange={(val) => setValue('isActive', val)}
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
                <Input id='name' className='mt-2' value={user.name} disabled />
              </div>

              <div>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  className='mt-2'
                  value={user.email}
                  disabled
                />
              </div>

              <div>
                <Label htmlFor='isOAuth'>OAuth User</Label>
                <Input
                  id='isOAuth'
                  className='mt-2'
                  value={user.isOAuth ? 'Yes' : 'No'}
                  disabled
                />
              </div>

              <div>
                <Label htmlFor='createdAt'>Created At</Label>
                <Input
                  id='createdAt'
                  className='mt-2'
                  disabled
                  value={user.createdAt.toLocaleString()}
                />
              </div>

              <div>
                <Label htmlFor='lastLogin'>Last Login</Label>
                <Input
                  id='lastLogin'
                  className='mt-2'
                  disabled
                  value={
                    user.lastLogin ? user.lastLogin.toLocaleString() : 'Never'
                  }
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
                />
              </div>

              <DialogFooter className='mt-6'>
                <Button type='button' variant='outline' onClick={onClose}>
                  Cancel
                </Button>
                <Button disabled={isSubmitting} type='submit'>
                  {isSubmitting && <Loader2 className='animate-spin' />}
                  {isSubmitting ? 'Updating...' : 'Update'}
                </Button>
              </DialogFooter>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};
