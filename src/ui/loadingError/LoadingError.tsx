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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Не нужны другие зависимости
  }, []);

  return (
    <div className={cn(className, styles.wrapper)}>
      <p>{message}</p>
    </div>
  );
};
