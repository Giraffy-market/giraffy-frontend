import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { endpoints } from '@/shared/api/constants/endpoints';
import type { HttpError } from '@/shared/api/errors/http-error';
import { customFetch } from '@/shared/api/fetch';
import type { User } from '@/shared/types';

const userKey = {
  byId: 'get-user-by-id',
};

export const useFetchUser = (id?: string) => {
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';
  const userIdForQuery = id || session?.user?.id;

  return useQuery<User, HttpError>({
    queryKey: [userKey.byId, userIdForQuery],
    queryFn: () => {
      const url = id ? endpoints.users.BY_ID(id) : endpoints.users.me;

      return customFetch<User>(url, '', {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      });
    },
    enabled: !!id || (isLoggedIn && !!userIdForQuery),
  });
};
