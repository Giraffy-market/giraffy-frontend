'use client';

import { useEffect } from 'react';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const accessToken = searchParams.get('access_token');
    const refreshToken = searchParams.get('refresh_token');
    const userId = searchParams.get('user_id');

    if (accessToken) {
      // Використовуємо твій CredentialsProvider, щоб створити сесію NextAuth
      signIn('credentials', {
        accessToken,
        refreshToken,
        userId,
        redirect: false,
      }).then(() => {
        router.push('/'); // Повертаємо на головну вже залогованим
      });
    }
  }, [searchParams, router]);

  return <div>Авторизація... зачекайте</div>;
}
