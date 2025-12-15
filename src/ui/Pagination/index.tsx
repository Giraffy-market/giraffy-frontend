import type { ComponentProps } from 'react';

import Button from '@/ui/button';

import Arrow from './assets/arrow-right.svg';

import styles from './styles.module.scss';

function Pagination({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={`${styles.pagination} ${className ?? ''}`.trim()}
      {...props}
    />
  );
}

function PaginationContent({ className, ...props }: ComponentProps<'ul'>) {
  return (
    <ul
      data-slot="pagination-content"
      className={`${styles['pagination-content']} ${className ?? ''}`.trim()}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: ComponentProps<'li'>) {
  return <li data-slot="pagination-item" {...props} />;
}

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ComponentProps<typeof Button>, 'size'> &
  ComponentProps<'a'>;

function PaginationLink({ isActive, ...props }: PaginationLinkProps) {
  return (
    <Button asChild variant={isActive ? 'outline' : 'ghost'}>
      <a
        aria-current={isActive ? 'page' : undefined}
        data-slot="pagination-link"
        data-active={isActive}
        {...props}
      />
    </Button>
  );
}

function PaginationPrevious({
  className,
  ...props
}: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="md"
      className={`${styles['pagination-previous']} ${className ?? ''}`.trim()}
      {...props}
    >
      <Arrow className={styles['left-arrow']} role="img" aria-label="arrow" />
    </PaginationLink>
  );
}

function PaginationNext({
  className,
  ...props
}: ComponentProps<typeof PaginationLink>) {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="md"
      className={`${styles['pagination-next']} ${className ?? ''}`.trim()}
      {...props}
    >
      <Arrow role="img" aria-label="arrow" />
    </PaginationLink>
  );
}

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
};
