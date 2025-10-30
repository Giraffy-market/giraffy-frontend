import { type FC, useState } from 'react';

import cn from 'classnames';
import { motion } from 'framer-motion';

import { ParentCategories } from '../../../../modules/header-categories/ui/ParentCategories/ParentCategories';
import { SubCategories } from '../../../../modules/header-categories/ui/SubCategories/SubCategories';
import { POPUP_ANIMATION_CONFIG } from '../../constants/constants';
import styles from './HeaderCategoriesPopup.module.scss';

type Props = {
  className?: string;
};

export const HeaderCategoriesPopup: FC<Props> = ({ className }) => {
  const [activeParentCategoryId, setActiveParentCategoryId] = useState<
    number | null
  >(null);

  return (
    <motion.div
      {...POPUP_ANIMATION_CONFIG}
      className={cn(className, styles.wrapper)}
    >
      <div className={styles.body}>
        <ParentCategories
          activeParentCategoryId={activeParentCategoryId}
          setActiveParentCategoryId={setActiveParentCategoryId}
        />

        {activeParentCategoryId && (
          <SubCategories activeParentCategoryId={activeParentCategoryId} />
        )}
      </div>
    </motion.div>
  );
};
