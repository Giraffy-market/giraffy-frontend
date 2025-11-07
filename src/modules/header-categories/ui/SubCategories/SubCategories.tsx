import type { FC } from 'react';

import type {
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';
import cn from 'classnames';
import Link from 'next/link';

import { Loader } from '@/ui/loader/Loader';
import { LoadingError } from '@/ui/loadingError/LoadingError';

import styles from './SubCategories.module.scss';

type RefetchFn = (
  options?: RefetchOptions,
) => Promise<QueryObserverResult<unknown, unknown>>;

type Category = {
  category_id: number;
  name: string;
  children?: Category[];
};

type Props = {
  categoriesData: Category[];
  activeParentCategoryId: number;
  error?: { message?: string } | null;
  isLoading?: boolean;
  refetch?: RefetchFn;
  className?: string;
};

export const SubCategories: FC<Props> = ({
  categoriesData,
  activeParentCategoryId,
  error,
  isLoading,
  refetch,
  className,
}) => {
  const safeRefetch: RefetchFn = async (options) => {
    if (refetch) return await refetch(options);
    return Promise.resolve({} as QueryObserverResult<unknown, unknown>);
  };

  if (error?.message) {
    return <LoadingError message={error.message} refetch={safeRefetch} />;
  }

  if (!categoriesData?.length || !activeParentCategoryId) {
    return <LoadingError message="Data not found" refetch={safeRefetch} />;
  }

  const parentCategory = categoriesData.find(
    (cat) => cat.category_id === activeParentCategoryId,
  );

  const children = parentCategory?.children || [];

  return (
    <ul className={cn(styles.items, className)}>
      {isLoading ? (
        <li className={styles.loaderItem}>
          <Loader />
        </li>
      ) : !children.length ? (
        <li className={styles.emptyItem}>Немає підкатегорій</li>
      ) : (
        children.map((child) => (
          <li key={child.category_id} className={styles.item}>
            <Link href={`/categories/${child.name}`}>{child.name}</Link>
          </li>
        ))
      )}
    </ul>
  );
};
