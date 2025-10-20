import type { FC } from 'react';

import { useQuery } from '@tanstack/react-query';
import cn from 'classnames';

import { fetchSubCategories } from '@/modules/categories/api/fetchSubCategories';
import type { CategoryItem } from '@/modules/categories/types/CategoryItem';

import { HeaderCategoriesError } from '../HeaderCategoriesError/HeaderCategoriesError';
import { HeaderCategoriesIsLoading } from '../HeaderCategoriesIsLoading/HeaderCategoriesIsLoading';
import styles from './SubCategories.module.scss';

interface Props {
  activeParentCategoryId: number | null;

  className?: string;
}

export const SubCategories: FC<Props> = ({
  activeParentCategoryId,
  className,
}) => {
  const { data, error, isLoading } = useQuery<CategoryItem[]>({
    queryKey: ['header-sub-categories', activeParentCategoryId],
    queryFn: () => fetchSubCategories(activeParentCategoryId || 0),
    enabled: activeParentCategoryId !== null,
  });

  if (error || !data) {
    return <HeaderCategoriesError message={error?.message} />;
  }

  if (isLoading) {
    return <HeaderCategoriesIsLoading />;
  }

  return data ? (
    <ul className={cn(styles.items, className)}>
      {data.map((el) => (
        <li key={el.category_id} className={styles.item}>
          <a href="#">{el.name}</a>
        </li>
      ))}
    </ul>
  ) : null;
};
