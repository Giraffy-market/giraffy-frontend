'use client';

import type { Dispatch, FC, SetStateAction } from 'react';
import { useEffect } from 'react';

import type {
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';
import cn from 'classnames';

import { Loader } from '@/ui/loader/Loader';
import { LoadingError } from '@/ui/loadingError/LoadingError';

import { useFetchParentCategories } from '../../api/useFetchParentCategories';
import styles from './ParentCategories.module.scss';

type RefetchFn = (
  options?: RefetchOptions,
) => Promise<QueryObserverResult<unknown, unknown>>;

type ParentCategory = {
  category_id: number;
  name: string;
  children?: ParentCategory[];
};

type Props = {
  activeParentCategoryId: number | null;
  setActiveParentCategoryId: Dispatch<SetStateAction<number | null>>;
  setCategoriesData: Dispatch<SetStateAction<ParentCategory[]>>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  setError: Dispatch<SetStateAction<{ message?: string } | null>>;
  setRefetch: Dispatch<SetStateAction<RefetchFn | undefined>>;
  className?: string;
};

export const ParentCategories: FC<Props> = ({
  activeParentCategoryId,
  setActiveParentCategoryId,
  setCategoriesData,
  setIsLoading,
  setError,
  setRefetch,
  className,
}) => {
  const { data, error, isLoading, refetch } = useFetchParentCategories();

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  useEffect(() => {
    setError(error ? { message: error.message } : null);
  }, [error, setError]);

  useEffect(() => {
    setRefetch(() => refetch);
  }, [refetch, setRefetch]);

  useEffect(() => {
    if (data && data.length > 0) {
      setCategoriesData(data);

      if (activeParentCategoryId === null) {
        setActiveParentCategoryId(data[0].category_id);
      }
    }
  }, [
    data,
    activeParentCategoryId,
    setActiveParentCategoryId,
    setCategoriesData,
  ]);

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
