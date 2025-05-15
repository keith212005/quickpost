'use client';

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';

interface PaginateProps {
  page: number;
  totalPages: number;
  setPage: (page: number) => void;
  pagesToShow?: number;
}

export function Paginate({
  page,
  totalPages,
  setPage,
  pagesToShow = 5,
}: PaginateProps) {
  const half = Math.floor(pagesToShow / 2);
  let start = Math.max(1, page - half);
  const end = Math.min(totalPages, start + pagesToShow - 1);

  if (end - start + 1 < pagesToShow && start > 1) {
    start = Math.max(1, end - pagesToShow + 1);
  }

  const pageNumbers = Array.from(
    { length: end - start + 1 },
    (_, i) => start + i,
  );

  return (
    <Pagination className='justify-center pt-6'>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => setPage(Math.max(1, page - 1))}
            className={page === 1 ? 'pointer-events-none opacity-50' : ''}
          />
        </PaginationItem>

        {start > 1 && (
          <>
            <PaginationItem>
              <PaginationLink
                className='cursor-pointer'
                onClick={() => setPage(1)}
              >
                1
              </PaginationLink>
            </PaginationItem>
            {start > 2 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
          </>
        )}

        {pageNumbers.map((num) => (
          <PaginationItem key={num}>
            <PaginationLink
              className='cursor-pointer'
              isActive={num === page}
              onClick={() => setPage(num)}
            >
              {num}
            </PaginationLink>
          </PaginationItem>
        ))}

        {end < totalPages && (
          <>
            {end < totalPages - 1 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                className='cursor-pointer'
                onClick={() => setPage(totalPages)}
              >
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        <PaginationItem>
          <PaginationNext
            onClick={() => setPage(Math.min(totalPages, page + 1))}
            className={
              page === totalPages ? 'pointer-events-none opacity-50' : ''
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
