'use client';

import type { JSX } from 'react';

import type { Session } from 'next-auth';
import { signOut } from 'next-auth/react';

import { Button } from '@/ui/button/Button';

type Props = {
  session: Session | null;
};

export const TestClient = ({ session }: Props): JSX.Element => {
  console.log('Client session:', session);

  return (
    <>
      <div>Welcome to the Test Page {session?.access_token}</div>
      <Button
        text="Sign out"
        variant="primary"
        onClick={() => signOut({ callbackUrl: '/' })}
      />
    </>
  );
};
