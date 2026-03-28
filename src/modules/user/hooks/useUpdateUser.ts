import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { updateUser } from '../api/updateUser';

import type { UpdateUserPayload } from '../types/types';

import type { HttpError } from '@/shared/api/errors/http-error';
import type { User } from '@/shared/types';

export const useUpdateUser = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation<User, HttpError, UpdateUserPayload>({
    mutationFn: (payload: UpdateUserPayload) => {
      const token = session?.access_token;
      if (!token) throw new Error('Unauthorized');

      return updateUser(token, payload);
    },
    onSuccess: (updatedUser) => {
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });

      queryClient.setQueryData(
        ['user', 'me', session?.access_token],
        updatedUser,
      );
    },
  });
};
