'use client';

import type { Dispatch, FC, SetStateAction } from 'react';

import cn from 'classnames';

import type { CategoryItem } from '@/modules/categories/types/CategoryItem';

import styles from './ParentCategories.module.scss';

type Props = {
  categories: CategoryItem[];
  activeParentCategory: CategoryItem | null;
  setActiveParentCategory: Dispatch<SetStateAction<CategoryItem | null>>;
  className?: string;
};

export const ParentCategories: FC<Props> = ({
  categories,
  activeParentCategory,
  setActiveParentCategory,
  className,
}) => {
  return (
    <ul className={cn(styles.items, className)}>
      {categories.map((cat) => (
        <li
          key={cat.category_id}
          className={cn(styles.item, {
            [styles.active]:
              activeParentCategory?.category_id === cat.category_id,
          })}
          onClick={() => setActiveParentCategory(cat)}
        >
          {cat.name}
        </li>
      ))}
    </ul>
  );
};
