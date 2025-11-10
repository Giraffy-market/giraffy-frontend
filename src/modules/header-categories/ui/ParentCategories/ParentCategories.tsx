'use client';

import type { Dispatch, FC, SetStateAction } from 'react';

import cn from 'classnames';

import type { CategoryItem } from '@/modules/categories/types/CategoryItem';

import styles from './ParentCategories.module.scss';

type Props = {
  categories: CategoryItem[];
  activeParentCategoryId: number | null;
  setActiveParentCategoryId: Dispatch<SetStateAction<number | null>>;
  className?: string;
};

export const ParentCategories: FC<Props> = ({
  categories,
  activeParentCategoryId,
  setActiveParentCategoryId,
  className,
}) => {
  if (!categories?.length) return null;

  return (
    <ul className={cn(styles.items, className)}>
      {categories.map((cat) => (
        <li
          key={cat.category_id}
          className={cn(styles.item, {
            [styles.active]: activeParentCategoryId === cat.category_id,
          })}
          onClick={() => setActiveParentCategoryId(cat.category_id)}
        >
          {cat.name}
        </li>
      ))}
    </ul>
  );
};
