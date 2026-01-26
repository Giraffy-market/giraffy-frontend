'use client';

import type { FC } from 'react';

import Error from '@/components/ui/loadingErrorPage/LoadingErrorPage';

type ErrorProps = { reset: () => void };
const error: FC<ErrorProps> = ({ reset }) => {
  return (
    <Error
      errorCode={500}
      title={['Технічні труднощі']}
      description="Тимчасові проблеми на сервері. Команда вже працює над вирішенням"
      onRetry={reset}
      showUpdateButton={true}
    />
  );
};
export default error;
