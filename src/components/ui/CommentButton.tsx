'use client';

import { MessageSquareText } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CommentButtonProps extends React.ComponentProps<typeof Button> {
  count?: number;
  className?: string;
}

export function CommentButton({
  count,
  className,
  ...props
}: CommentButtonProps) {
  return (
    <Button
      variant='ghost'
      size='sm'
      className={cn(
        'text-muted-foreground flex items-center space-x-1',
        className,
      )}
      {...props}
    >
      <MessageSquareText className='h-4 w-4' />
      {typeof count === 'number' && (
        <span className='text-xs font-medium'>{count}</span>
      )}
    </Button>
  );
}
