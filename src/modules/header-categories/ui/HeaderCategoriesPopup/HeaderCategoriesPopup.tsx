import { type FC, useState } from 'react';

import type {
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';
import cn from 'classnames';
import { motion } from 'framer-motion';

import { ParentCategories } from '../../../../modules/header-categories/ui/ParentCategories/ParentCategories';
import { SubCategories } from '../../../../modules/header-categories/ui/SubCategories/SubCategories';
import { POPUP_ANIMATION_CONFIG } from '../../constants/constants';
import styles from './HeaderCategoriesPopup.module.scss';

type RefetchFn = (
  options?: RefetchOptions,
) => Promise<QueryObserverResult<unknown, unknown>>;

type Category = {
  category_id: number;
  name: string;
  children?: Category[];
};

type Props = {
  className?: string;
};

export const HeaderCategoriesPopup: FC<Props> = ({ className }) => {
  const [activeParentCategoryId, setActiveParentCategoryId] = useState<
    number | null
  >(null);
  const [categoriesData, setCategoriesData] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<{ message?: string } | null>(null);
  const [refetch, setRefetch] = useState<RefetchFn | undefined>();

  const showSubcategories =
    !error && !!activeParentCategoryId && categoriesData.length > 0;

  return (
    <motion.div
      {...POPUP_ANIMATION_CONFIG}
      className={cn(styles.wrapper, className)}
    >
      <div className={styles.body}>
        <ParentCategories
          activeParentCategoryId={activeParentCategoryId}
          setActiveParentCategoryId={setActiveParentCategoryId}
          setCategoriesData={setCategoriesData}
          setIsLoading={setIsLoading}
          setError={setError}
          setRefetch={setRefetch}
        />

        {showSubcategories && (
          <SubCategories
            categoriesData={categoriesData}
            activeParentCategoryId={activeParentCategoryId}
            error={error}
            refetch={refetch}
          />
        )}
      </div>
    </motion.div>
  );
};
