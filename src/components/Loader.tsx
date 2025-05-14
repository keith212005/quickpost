// app/loading.tsx
'use client';

import { Loader2 } from 'lucide-react';

export default function Loader() {
  return (
    <div className='flex h-screen w-full items-center justify-center'>
      <Loader2 className='text-muted-foreground h-6 w-6 animate-spin' />
    </div>
  );
}
