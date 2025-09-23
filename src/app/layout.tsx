import type { FC, PropsWithChildren } from 'react';

import type { Metadata } from 'next';

import { nunito, openSans } from '@/layouts/root';

import AuthProvider from '@/modules/auth/providers/AuthProvider';

import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Gyraffy',
  description: 'The best e-commerce platform',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="uk">
      <body className={`${nunito.variable} ${openSans.variable}`}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
