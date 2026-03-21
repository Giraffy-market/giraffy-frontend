import { type FC, type PropsWithChildren } from 'react';

import { Breadcrumbs } from '@/components/common/Breadcrumbs';

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Breadcrumbs />
      <main>{children}</main>
    </>
  );
};

export default RootLayout;
