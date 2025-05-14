// app/loading.tsx
'use client';

import { Loader2 } from 'lucide-react';

export default function Loader() {
  return <Loader2 className='text-muted-foreground h-5 w-5 animate-spin' />;
}
