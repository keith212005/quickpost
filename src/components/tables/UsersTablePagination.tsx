import React from 'react';

import { Button } from '../ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

// Pagination component extracted from UsersTable
export const UsersTablePagination = ({
  totalPages,
  currentPage,
  setCurrentPage,
  goToPreviousPage,
  goToNextPage,
}: {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  goToPreviousPage: () => void;
  goToNextPage: () => void;
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className='mt-4 flex justify-end'>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious onClick={goToPreviousPage} />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              if (totalPages <= 5) return true;
              if (page === 1 || page === totalPages) return true;
              if (Math.abs(currentPage - page) <= 1) return true;
              if (currentPage <= 3 && page <= 4) return true;
              if (currentPage >= totalPages - 2 && page >= totalPages - 3)
                return true;
              return false;
            })
            .map((page, index, arr) => {
              const prevPage = arr[index - 1];
              const showEllipsis = prevPage && page - prevPage > 1;

              return (
                <React.Fragment key={page}>
                  {showEllipsis && (
                    <PaginationItem key={`ellipsis-${page}`}>
                      <span className='px-2 text-sm'>...</span>
                    </PaginationItem>
                  )}
                  <PaginationItem key={page}>
                    <Button
                      variant={page === currentPage ? 'outline' : 'ghost'}
                      size='sm'
                      onClick={() => setCurrentPage(page)}
                      className='px-3'
                    >
                      {page}
                    </Button>
                  </PaginationItem>
                </React.Fragment>
              );
            })}
          <PaginationItem>
            <PaginationNext onClick={goToNextPage} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};
