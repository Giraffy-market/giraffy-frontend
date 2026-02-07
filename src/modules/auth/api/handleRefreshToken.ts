import type { JWT } from 'next-auth/jwt';

import type { LoginResponse } from '@/modules/auth/type/types';

import { endpoints } from '@/shared/api/constants/endpoints';
import { customFetch } from '@/shared/api/fetch';

export const handleRefreshToken = async (token: JWT): Promise<JWT> => {
  const refreshed = await customFetch<LoginResponse>(
    endpoints.auth.refresh,
    undefined,
    {
      method: 'POST',
      body: JSON.stringify({ refresh_token: token.refresh_token }),
    },
  );

  // Мы НЕ возвращаем refreshed напрямую.
  // Мы создаем объект, который соответствует интерфейсу JWT.
  return {
    ...token, // сохраняем старые данные (user_id и т.д.)
    access_token: refreshed.access_token,
    refresh_token: refreshed.refresh_token ?? token.refresh_token,
    token_type: refreshed.token_type,
    expired_in: refreshed.expired_in,
    // ВОТ ТУТ мы создаем недостающее поле expiresAt
    expiresAt: Math.floor(Date.now() / 1000) + refreshed.expired_in,
  };
};
