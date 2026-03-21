import { useQuery } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { getUserById } from '../api/getUserById';

export const useUserById = (id?: string) => {
  const { data: session } = useSession();
  return useQuery({
    queryKey: ['user', id],
    queryFn: () => getUserById(id!, session?.access_token as string),
    enabled: !!id,
    retry: false,
  });
};
