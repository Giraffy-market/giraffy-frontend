'use client';

import { type FC } from 'react';

import { signOut, useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button/Button';

const Test: FC = () => {
  const session = useSession();
  console.log(session);

  return (
    <>
      <div>Welcome to the Test Page {session?.data?.access_token}</div>
      {/* <div>Welcome to the Test Page </div> */}
      <Button
        text="Sign out"
        variant="primary"
        onClick={() => signOut({ callbackUrl: '/' })}
      />
    </>
  );
};

export default Test;
