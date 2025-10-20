import type { FC } from 'react';

import cn from 'classnames';

import styles from './HeaderCategoriesIsLoading.module.scss';

interface Props {
  className?: string;
}

export const HeaderCategoriesIsLoading: FC<Props> = ({ className }) => {
  return (
    <ul className={cn(styles.items, className)}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <li className={styles.skeletonItem} key={idx}></li>
      ))}
    </ul>
  );
};
