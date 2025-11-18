'use client';

import type { FC } from 'react';

import cn from 'classnames';
import Link from 'next/link';

import type { CategoryItem } from '@/modules/categories/types/CategoryItem';

import { routing } from '@/shared/routing';

import styles from './SubCategories.module.scss';

type Props = {
  childrenCategories: CategoryItem[];
  subCategoriesListClassName?: string;
};

export const SubCategories: FC<Props> = ({
  childrenCategories,
  subCategoriesListClassName,
}) => {
  if (!childrenCategories.length) {
    return <p className={styles.empty}>Немає підкатегорій</p>;
  }

  return (
    <ul className={cn(styles.items, subCategoriesListClassName)}>
      {childrenCategories.map((child) => (
        <li key={child.category_id} className={styles.item}>
          <Link href={routing.categories.byId(child.category_id)}>
            {child.name}
          </Link>
        </li>
      ))}
    </ul>
  );
};
