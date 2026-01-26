'use client';

import type { FC, PropsWithChildren } from 'react';

import { SessionProvider } from 'next-auth/react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { ReactQueryProvider } from './providers';

export const RootProvider: FC<PropsWithChildren> = ({ children }) => (
  <SessionProvider>
    <ReactQueryProvider>
      <NuqsAdapter>{children}</NuqsAdapter>
    </ReactQueryProvider>
  </SessionProvider>
);
