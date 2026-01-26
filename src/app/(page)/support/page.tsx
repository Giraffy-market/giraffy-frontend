'use client';

import { type FC } from 'react';

import SupportPage from '@/views/support/SupportPage';
import { useSession } from 'next-auth/react';

const Page: FC = () => {
  const session = useSession();
  console.log(session);

  return (
    <>
      <SupportPage />
    </>
  );
};

export default Page;
