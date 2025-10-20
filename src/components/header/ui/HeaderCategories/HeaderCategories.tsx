import { type FC, useState } from 'react';

import cn from 'classnames';

import { ParentCategories } from '../ParentCategories/ParentCategories';
import { SubCategories } from '../SubCategories/SubCategories';
import styles from './HeaderCategories.module.scss';

interface Props {
  className?: string;
}

export const HeaderCategories: FC<Props> = ({ className }) => {
  const [activeParentCategoryId, setActiveParentCategoryId] = useState<
    number | null
  >(null);

  return (
    <div className={cn(className, styles.wrapper)}>
      <div className={styles.body}>
        <ParentCategories
          activeParentCategoryId={activeParentCategoryId}
          setActiveParentCategoryId={setActiveParentCategoryId}
        />

        <SubCategories activeParentCategoryId={activeParentCategoryId} />
      </div>
    </div>
  );
};
