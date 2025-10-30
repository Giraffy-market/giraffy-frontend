import type { Dispatch, FC, SetStateAction } from 'react';

import cn from 'classnames';

import { Loader } from '@/ui/loader/Loader';
import { LoadingError } from '@/ui/loadingError/LoadingError';

import { useFetchParentCategories } from '../../api/useFetchParentCategories';
import styles from './ParentCategories.module.scss';

type Props = {
  activeParentCategoryId: number | null;
  setActiveParentCategoryId: Dispatch<SetStateAction<number | null>>;

  className?: string;
};

export const ParentCategories: FC<Props> = ({
  activeParentCategoryId,
  setActiveParentCategoryId,
  className,
}) => {
  const { data, error, isLoading, refetch } = useFetchParentCategories();

  if (error && error.message) {
    return <LoadingError message={error.message} refetch={refetch} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!data) {
    return <LoadingError message="Data not found" refetch={refetch} />;
  }

  return (
    <ul
      className={cn(
        styles.items,
        activeParentCategoryId !== null ? styles.mainCategories : '',
        className,
      )}
    >
      {data.map((el) => (
        <li
          onClick={() => setActiveParentCategoryId(el.category_id)}
          key={el.category_id}
          className={styles.item}
        >
          {el.name}
        </li>
      ))}
    </ul>
  );
};
