import { type FC, type PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

import type { Metadata } from 'next';

import { AuthFormLayout } from '@/modules/auth';

import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';

import { nunito, openSans } from '@/shared/lib/fonts';
import '@/shared/styles/globals.scss';

import { RootProvider } from '../providers/root-provider';

export const metadata: Metadata = {
  title: 'Gyraffy',
  description: 'The best e-commerce platform',
};

export const dynamic = 'force-dynamic';

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="uk">
      <body className={`${nunito.variable} ${openSans.variable}`}>
        <RootProvider>
          <Header />
          <Breadcrumbs />

          <main>{children}</main>

          <ToastContainer />
          <AuthFormLayout />
          <Footer />
        </RootProvider>
      </body>
    </html>
  );
};

export default RootLayout;
