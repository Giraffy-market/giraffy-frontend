'use client';

import { type FC, type PropsWithChildren, useEffect } from 'react';

import { SessionProvider } from 'next-auth/react';
import { NuqsAdapter } from 'nuqs/adapters/next/app';

import { ReactQueryProvider } from './providers';

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (API_URL) {
      fetch(`${API_URL}/categories`).catch(() => {});
    }
  }, []);

  return (
    <SessionProvider>
      <ReactQueryProvider>
        <NuqsAdapter>{children}</NuqsAdapter>
      </ReactQueryProvider>
    </SessionProvider>
  );
};
