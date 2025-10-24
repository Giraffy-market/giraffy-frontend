import { type FC, useState } from 'react';

import cn from 'classnames';

import CategoriesLogo from '@/components/header/assets/categories.svg';
import { HeaderCategoriesPopup } from '@/components/header/ui/HeaderCategoriesPopup/HeaderCategoriesPopup';

import styles from './HeaderCategories.module.scss';

interface Props {
  className?: string;
}

export const HeaderCategories: FC<Props> = ({ className }) => {
  const [activeCategoriesPopup, setActiveCategoriesPopup] =
    useState<boolean>(false);

  return (
    <div className={cn(styles.wrapper, className)}>
      <button
        className={styles.button}
        onClick={() => setActiveCategoriesPopup((prevState) => !prevState)}
      >
        <CategoriesLogo />
        <p>Категорії</p>
      </button>

      {activeCategoriesPopup ? <HeaderCategoriesPopup /> : null}
    </div>
  );
};
