'use client';

import { type FC } from 'react';

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
  page: number;
  setPage: (params: { page: number }) => void;
};

export const CustomPagination: FC<CustomPaginationType> = ({
  size,
  page,
  setPage,
}) => {
  const start = Math.max(1, page - 1);
  const end = Math.min(size, start + 1);
  const pagesToShow = end - start === 1 ? [start, end] : [start];

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious
              onClick={() => {
                setPage({ page: page - 1 });
              }}
              aria-disabled={page === 1}
            />
          </PaginationItem>
        )}

        {pagesToShow.map((p) => (
          <PaginationItem key={p}>
            <PaginationLink
              isActive={page === p}
              onClick={() => setPage({ page: p })}
            >
              {p}
            </PaginationLink>
          </PaginationItem>
        ))}

        {page !== size && (
          <PaginationItem>
            <PaginationNext
              onClick={() => {
                setPage({ page: page + 1 });
              }}
              aria-disabled={page === size}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};
