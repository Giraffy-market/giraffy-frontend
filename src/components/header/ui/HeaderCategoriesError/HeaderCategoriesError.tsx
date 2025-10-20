import type { FC } from 'react';

import cn from 'classnames';

interface Props {
  message: string | undefined;
  className?: string;
}

export const HeaderCategoriesError: FC<Props> = ({ message, className }) => {
  return (
    <div className={cn(className)}>
      <p>{message}</p>
    </div>
  );
};
