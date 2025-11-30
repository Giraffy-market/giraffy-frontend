import { type FC, type PropsWithChildren } from 'react';
import { ToastContainer } from 'react-toastify';

import { RootProvider } from '@/views/root-provider';
import type { Metadata } from 'next';

import { nunito, openSans } from '@/layouts/root';

import { AuthFormLayout } from '@/modules/auth';
import { Header } from '@/modules/header/Header';

import { Breadcrumbs } from '@/components/Breadcrumbs/Breadcrumbs';
import { Footer } from '@/components/Footer/Footer';

import '@/styles/globals.scss';

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
