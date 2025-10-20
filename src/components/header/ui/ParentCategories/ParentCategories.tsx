import type { Dispatch, FC, SetStateAction } from 'react';

import { useQuery } from '@tanstack/react-query';
import cn from 'classnames';

import { fetchCategories } from '@/modules/categories/api/fetchCategories';
import type { CategoryItem } from '@/modules/categories/types/CategoryItem';

import { HeaderCategoriesError } from '../HeaderCategoriesError/HeaderCategoriesError';
import { HeaderCategoriesIsLoading } from '../HeaderCategoriesIsLoading/HeaderCategoriesIsLoading';
import styles from './ParentCategories.module.scss';

interface Props {
  activeParentCategoryId: number | null;
  setActiveParentCategoryId: Dispatch<SetStateAction<number | null>>;

  className?: string;
}

export const ParentCategories: FC<Props> = ({
  activeParentCategoryId,
  setActiveParentCategoryId,
  className,
}) => {
  const { data, error, isLoading } = useQuery<CategoryItem[]>({
    queryKey: ['header-categories'],
    queryFn: fetchCategories,
  });

  if (error || !data) {
    return <HeaderCategoriesError message={error?.message} />;
  }

  if (isLoading) {
    return <HeaderCategoriesIsLoading />;
  }

  console.log('isLoading ->', isLoading);

  return data ? (
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
  ) : null;
};
