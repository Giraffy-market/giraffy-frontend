'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import type { User } from '../types/user';

import { USER_QUERY_KEY } from '../constants/constants';

import { routes } from '@/shared/api/constants/routes';
import type { HttpError } from '@/shared/api/errors/http-error';
import { customFetch } from '@/shared/api/fetch';

export const useFetchUser = () => {
  const { data, status } = useSession();
  const isLoggedIn = status === 'authenticated';

  return useQuery<User, HttpError>({
    queryKey: [USER_QUERY_KEY],
    queryFn: () =>
      customFetch<User>(routes.users.me, '', {
        headers: { Authorization: `Bearer ${data?.access_token}` },
      }),
    enabled: isLoggedIn,
  });
};
