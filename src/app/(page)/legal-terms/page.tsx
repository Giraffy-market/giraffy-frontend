'use client';

import { type FC } from 'react';

import LegalTermsPage from '@/views/legal-terms/LegalTermsPage';
import { useSession } from 'next-auth/react';

const Page: FC = () => {
  const session = useSession();
  console.log(session);

  return (
    <>
      <LegalTermsPage />
    </>
  );
};

export default Page;
