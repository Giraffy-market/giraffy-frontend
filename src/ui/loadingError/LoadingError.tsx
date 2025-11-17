import { type FC, useEffect } from 'react';

import cn from 'classnames';

import type { LoadingErrorProps } from './shared/types/LoadingErrorProps';

import styles from './styles/loadingError.module.scss';

export const LoadingError: FC<LoadingErrorProps> = ({
  refetch,
  message,
  className,
}) => {
  useEffect(() => {
    refetch();
  }, []);

  return (
    <div className={cn(className, styles.wrapper)}>
      <p>{message}</p>
    </div>
  );
};
