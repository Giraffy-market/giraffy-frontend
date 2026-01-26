'use client';

import { type FC } from 'react';

import PrivacyPage from '@/views/privacy/PrivacyPage';
import { useSession } from 'next-auth/react';

const Page: FC = () => {
  const session = useSession();
  console.log(session);

  return (
    <>
      <PrivacyPage />
    </>
  );
};

export default Page;
