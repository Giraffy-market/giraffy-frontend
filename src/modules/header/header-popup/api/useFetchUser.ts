'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import type { User } from '@/modules/profile/types/user';

import { routes } from '@/shared/api/constants/routes';
import type { HttpError } from '@/shared/api/errors/http-error';
import { customFetch } from '@/shared/api/fetch';

const userKey = {
  me: 'get-user-me',
};

export const useFetchUser = () => {
  const { data, status } = useSession();
  const isLoggedIn = status === 'authenticated';

  return useQuery<User, HttpError>({
    queryKey: [userKey.me],
    queryFn: () =>
      customFetch<User>(routes.users.me, '', {
        headers: { Authorization: `Bearer ${data?.access_token}` },
      }),
    enabled: isLoggedIn,
  });
};
