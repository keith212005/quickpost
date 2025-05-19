'use client';

import { CardContent } from '@/components/ui/card';

type Props = {
  content: string;
  createdAt: string | Date;
  tags?: string[];
  isExpanded: boolean;
  setIsExpanded: (val: boolean) => void;
  isLongContent: boolean;
};

export default function PostContent({
  content,
  createdAt,
  tags = [],
  isExpanded,
  setIsExpanded,
  isLongContent,
}: Props) {
  return (
    <CardContent className='text-muted-foreground mt-2 px-5 text-base leading-relaxed whitespace-pre-wrap'>
      <div
        className={`transition-all duration-300 ${
          !isExpanded && isLongContent ? 'line-clamp-5' : ''
        }`}
      >
        {content}
      </div>

      {new Date().getTime() - new Date(createdAt).getTime() < 86400000 && (
        <span className='mt-3 inline-block rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800'>
          New
        </span>
      )}

      <div className='mt-3 flex flex-wrap gap-2'>
        {tags.map((tag, index) => (
          <span
            key={`${tag}-${index}`}
            className='bg-accent text-accent-foreground hover:bg-muted hover:text-foreground rounded-md px-2 py-1 text-xs font-medium shadow-sm transition'
            title={`View posts tagged with ${tag}`}
          >
            #{tag}
          </span>
        ))}
      </div>

      {isLongContent && (
        <button
          className='mt-3 text-sm font-medium text-blue-600 hover:underline'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Show less' : 'Read more'}
        </button>
      )}
    </CardContent>
  );
}
