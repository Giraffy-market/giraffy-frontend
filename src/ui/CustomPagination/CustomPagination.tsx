'use client';

import { type FC } from 'react';

import { useQueryState } from 'nuqs';

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../Pagination';

type CustomPaginationType = {
  size: number;
};

export const CustomPagination: FC<CustomPaginationType> = ({ size }) => {
  const [page, setPage] = useQueryState('page');

  if (size <= 1) return null;

  const currentPage = page ? parseInt(page, 10) : 1;

  const start = Math.max(1, currentPage - 1);
  const end = Math.min(size, start + 1);
  const pagesToShow = end - start === 1 ? [start, end] : [start];

  return (
    <Pagination>
      <PaginationContent>
        {currentPage > 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                setPage(String(currentPage - 1));
              }}
              aria-disabled={currentPage === 1}
            />
          </PaginationItem>
        )}

        {pagesToShow.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              isActive={currentPage === p}
              onClick={() => setPage(String(p))}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {currentPage !== size && (
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                setPage(String(currentPage + 1));
              }}
              aria-disabled={currentPage === size}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
