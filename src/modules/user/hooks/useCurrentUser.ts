import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { getCurrentUser } from '../api/getCurrentUser';

import type { HttpError } from '@/shared/api/errors/http-error';
import type { User } from '@/shared/types';

export const useCurrentUser = (
  options: { enabled: boolean } = { enabled: true },
) => {
  const { data: session, status } = useSession();
  const isLoggedIn = status === 'authenticated';

  const token = session?.access_token;

  const query = useQuery<User, HttpError>({
    queryKey: ['user', 'me', token],
    queryFn: () => getCurrentUser(session?.access_token as string),
    enabled:
      options.enabled &&
      isLoggedIn &&
      typeof token === 'string' &&
      token.length > 0,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  return {
    ...query,
    user: query.data,
    isLoggedIn,
    isLoading: status === 'loading' || query.isLoading,
  };
};
