'use client';

import { useEffect } from 'react';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function GoogleCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Отримуємо токен, який бекенд передав у URL
    const accessToken = searchParams.get('access_token');

    if (accessToken) {
      // Використовуємо ваш CredentialsProvider
      signIn('credentials', {
        accessToken: accessToken,
        userId: 'google-user', // або інше значення, якщо бекенд його шле
        redirect: false,
      }).then((res) => {
        if (res?.ok) {
          router.push('/'); // Повертаємо на головну сторінку
        } else {
          console.error('Помилка створення сесії NextAuth');
        }
      });
    }
  }, [searchParams, router]);

  return (
    <div className="flex h-screen items-center justify-center">
      <p>Завершуємо вхід... зачекайте момент</p>
    </div>
  );
}
