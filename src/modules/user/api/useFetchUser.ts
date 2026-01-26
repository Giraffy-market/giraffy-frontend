'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { endpoints } from '@/shared/api/constants/endpoints';
import type { HttpError } from '@/shared/api/errors/http-error';
import { customFetch } from '@/shared/api/fetch';
import type { User } from '@/shared/types';

const userKey = {
  me: 'get-user-me',
};

export const useFetchUser = () => {
  const { data, status } = useSession();
  const isLoggedIn = status === 'authenticated';

  return useQuery<User, HttpError>({
    queryKey: [userKey.me],
    queryFn: () =>
      customFetch<User>(endpoints.users.me, '', {
        headers: { Authorization: `Bearer ${data?.access_token}` },
      }),
    enabled: isLoggedIn,
  });
};
