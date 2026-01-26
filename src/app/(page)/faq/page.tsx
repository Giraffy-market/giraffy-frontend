'use client';

import { type FC } from 'react';

import FAQPage from '@/views/faq/FAQPage';
import { useSession } from 'next-auth/react';

const Page: FC = () => {
  const session = useSession();
  console.log(session);

  return (
    <>
      <FAQPage />
    </>
  );
};

export default Page;
