import { type FC, type PropsWithChildren, Suspense } from 'react';
import { ToastContainer } from 'react-toastify';

import { ReactQueryProvider } from '@/providers/ReactQueryProvider';
import type { Metadata } from 'next';
import { NuqsAdapter } from 'nuqs/adapters/next';

import { nunito, openSans } from '@/layouts/root';

import { AuthProvider } from '@/modules/auth/providers/AuthProvider';

import { Footer } from '@/components/Footer/Footer';

import { Loader } from '@/ui/loader/Loader';

import '@/styles/globals.scss';

export const metadata: Metadata = {
  title: 'Gyraffy',
  description: 'The best e-commerce platform',
};

const RootLayout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <html lang="uk">
      <body className={`${nunito.variable} ${openSans.variable}`}>
        <AuthProvider>
          <ReactQueryProvider>
            <Suspense fallback={<Loader />}>
              <NuqsAdapter>
                <main>{children}</main>
                <ToastContainer />
              </NuqsAdapter>
            </Suspense>
          </ReactQueryProvider>
        </AuthProvider>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
