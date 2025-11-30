'use client';

import type { FC, PropsWithChildren } from 'react';

import { ReactQueryProvider } from '@/providers/ReactQueryProvider';
import { SessionProvider } from 'next-auth/react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

export const RootProvider: FC<PropsWithChildren> = ({ children }) => (
  <SessionProvider>
    <ReactQueryProvider>
      <NuqsAdapter>{children}</NuqsAdapter>
    </ReactQueryProvider>
  </SessionProvider>
);
