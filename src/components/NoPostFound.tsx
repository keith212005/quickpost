import { MessageSquareText } from 'lucide-react';

export const NoPostFound = () => {
  return (
    <div className='text-muted-foreground flex h-[calc(100vh-400px)] flex-col items-center justify-center space-y-4 text-center'>
      <MessageSquareText className='mb-4 h-10 w-10' />
      <h2 className='text-lg font-semibold'>No posts found</h2>
      <p className='text-sm'>
        You haven’t created any posts yet. Start sharing your thoughts!
      </p>
    </div>
  );
};
