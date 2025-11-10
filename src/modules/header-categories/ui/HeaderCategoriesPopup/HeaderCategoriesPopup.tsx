'use client';

import { type FC, useEffect, useState } from 'react';

import cn from 'classnames';
import { motion } from 'framer-motion';

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
  const [activeParentCategoryId, setActiveParentCategoryId] = useState<
    number | null
  >(null);

  const {
    data: categories,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchCategories();

  useEffect(() => {
    if (
      categories &&
      categories.length > 0 &&
      activeParentCategoryId === null
    ) {
      setActiveParentCategoryId(categories[0].category_id);
    }
  }, [categories, activeParentCategoryId]);

  if (isLoading) {
    return (
      <motion.div
        {...POPUP_ANIMATION_CONFIG}
        className={cn(styles.wrapper, className)}
      >
        <div className={styles.loaderWrap}>
          <Loader />
        </div>
      </motion.div>
    );
  }

  if (isError) {
    const errorMessage =
      (error as { message?: string })?.message ||
      'Не вдалося завантажити категорії';
    return (
      <motion.div
        {...POPUP_ANIMATION_CONFIG}
        className={cn(styles.wrapper, className)}
      >
        <LoadingError refetch={refetch} message={errorMessage} />
      </motion.div>
    );
  }

  if (!categories?.length) {
    return (
      <motion.div
        {...POPUP_ANIMATION_CONFIG}
        className={cn(styles.wrapper, className)}
      >
        <LoadingError refetch={refetch} message="Категорії не знайдено" />
      </motion.div>
    );
  }

  return (
    <motion.div
      {...POPUP_ANIMATION_CONFIG}
      className={cn(styles.wrapper, className)}
    >
      <div className={styles.body}>
        <ParentCategories
          categories={categories}
          activeParentCategoryId={activeParentCategoryId}
          setActiveParentCategoryId={setActiveParentCategoryId}
        />

        {activeParentCategoryId !== null && (
          <SubCategories
            categories={categories}
            activeParentCategoryId={activeParentCategoryId}
          />
        )}
      </div>
    </motion.div>
  );
};
