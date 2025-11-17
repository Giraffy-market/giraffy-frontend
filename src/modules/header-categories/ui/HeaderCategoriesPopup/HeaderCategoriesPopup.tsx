'use client';

import { type FC, useState } from 'react';

import cn from 'classnames';
import { motion } from 'framer-motion';

import type { CategoryItem } from '@/modules/categories/types/CategoryItem';
import { ParentCategories } from '@/modules/header-categories/ui/ParentCategories/ParentCategories';
import { SubCategories } from '@/modules/header-categories/ui/SubCategories/SubCategories';

import { Loader } from '@/ui/loader/Loader';
import { LoadingError } from '@/ui/loadingError/LoadingError';

import { useFetchCategories } from '../../api/useFetchCategories';
import { POPUP_ANIMATION_CONFIG } from '../../constants/constants';
import styles from './HeaderCategoriesPopup.module.scss';

type Props = {
  className?: string;
};

export const HeaderCategoriesPopup: FC<Props> = ({ className }) => {
  const {
    data: categories,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchCategories();

  const [activeParentCategory, setActiveParentCategory] =
    useState<CategoryItem | null>(
      categories && categories.length > 0 ? categories[0] : null,
    );

  if (isLoading) return <Loader />;

  if (isError || !categories) {
    const errorMessage = error?.detail || 'Помилка завантаження категорій';
    return <LoadingError refetch={refetch} message={errorMessage} />;
  }

  return (
    <motion.div
      {...POPUP_ANIMATION_CONFIG}
      className={cn(styles.wrapper, className)}
    >
      <div className={styles.body}>
        <ParentCategories
          categories={categories}
          activeParentCategory={activeParentCategory}
          setActiveParentCategory={setActiveParentCategory}
        />

        {activeParentCategory && (
          <SubCategories
            childrenCategories={activeParentCategory.children ?? []}
          />
        )}
      </div>
    </motion.div>
  );
};
