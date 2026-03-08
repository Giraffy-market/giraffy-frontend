'use client';

import type { FC } from 'react';

import Error from '@/components/ui/loadingErrorPage/LoadingErrorPage';
import Giraffe from '@/components/ui/loadingErrorPage/assets/giraffe.svg';

type ErrorProps = { reset: () => void };
const error: FC<ErrorProps> = ({ reset }) => {
  return (
    <Error
      Icon={Giraffe}
      title={['Технічні труднощі']}
      description="Тимчасові проблеми на сервері. Команда вже працює над вирішенням"
      onRetry={reset}
    />
  );
};
export default error;
