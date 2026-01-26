'use client';

import { type FC } from 'react';

import AboutPage from '@/views/about/AboutPage';
import { useSession } from 'next-auth/react';

const Page: FC = () => {
  const session = useSession();
  console.log(session);

  return (
    <>
      <AboutPage />
    </>
  );
};

export default Page;
