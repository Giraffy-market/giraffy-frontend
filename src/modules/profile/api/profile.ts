'use client';

import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import type { User } from '../types/user';

import { routes } from '@/shared/api/constants/routes';
import type { HttpError } from '@/shared/api/errors/http-error';
import { customFetch } from '@/shared/api/fetch';

const userKey = {
  profile: 'get-user-profile',
  byId: 'get-user-by-id',
};

export const useFetchUser = (id?: string) => {
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';

  return useQuery<User, HttpError>({
    queryKey: id ? [userKey.byId, id] : [userKey.profile],
    queryFn: () => {
      if (id) {
        return customFetch<User>(routes.users.byId.replace('{id}', id), '', {
          headers: { Authorization: `Bearer ${session?.access_token}` },
        });
      }
      return customFetch<User>(routes.users.profile, '', {
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
    },
    enabled: !id || isLoggedIn,
  });
};
