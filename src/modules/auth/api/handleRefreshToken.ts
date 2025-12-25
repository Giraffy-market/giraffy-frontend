import type { JWT } from 'next-auth/jwt';

import type { LoginResponse } from '@/modules/auth/type/types';

import { endpoints } from '@/shared/api/constants/endpoints';
import { customFetch } from '@/shared/api/fetch';

export const handleRefreshToken = async (token: JWT): Promise<JWT> => {
  const refreshed = await customFetch<LoginResponse>(
    endpoints.auth.refresh,
    '',
    {
      method: 'POST',
      body: JSON.stringify({
        refresh_token: token.refresh_token,
      }),
      headers: {
        Authorization: `Bearer ${token.access_token}`,
      },
    },
  );

  return {
    ...token,
    access_token: refreshed.access_token,
    refresh_token: refreshed.refresh_token ?? token.refresh_token,
    expired_in: Math.floor(Date.now() / 1000) + refreshed.expired_in,
  };
};
