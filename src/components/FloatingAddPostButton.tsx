'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

import AddOrEditPostForm from './AddOrEditPostForm';

const FloatingAddPostButton = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className='fixed right-6 bottom-6 z-50 h-14 w-14 rounded-full p-0 shadow-lg'
          variant='default'
          size='icon'
          aria-label='Add Post'
        >
          <Plus className='h-6 w-6' />
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-2xl'>
        <AddOrEditPostForm />
      </DialogContent>
    </Dialog>
  );
};

export default FloatingAddPostButton;
