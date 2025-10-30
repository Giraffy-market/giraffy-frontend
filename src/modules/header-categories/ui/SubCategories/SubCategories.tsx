import type { FC } from 'react';

import cn from 'classnames';
import Link from 'next/link';

import { Loader } from '@/ui/loader/Loader';
import { LoadingError } from '@/ui/loadingError/LoadingError';

import { useFetchSubCategories } from '../../api/useFetchSubCategories';
import styles from './SubCategories.module.scss';

type Props = {
  activeParentCategoryId: number;

  className?: string;
};

export const SubCategories: FC<Props> = ({
  activeParentCategoryId,
  className,
}) => {
  const { data, error, isLoading, refetch } = useFetchSubCategories(
    activeParentCategoryId,
  );

  if (error && error.message) {
    return <LoadingError message={error.message} refetch={refetch} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <LoadingError message={'Data not found'} refetch={refetch} />;
  }

  return (
    <ul className={cn(styles.items, className)}>
      {data.map((el) => (
        <li key={el.category_id} className={styles.item}>
          <Link href={`/categories/${el.name}`}>{el.name}</Link>
        </li>
      ))}
    </ul>
  );
};
