import { endpoints } from '@/shared/api/constants/endpoints';
import { customFetch } from '@/shared/api/fetch';
import type { User } from '@/shared/types';

import { getAuthHeaders } from './getAuthHeaders';

export const getUserById = async (id: string, token: string) => {
  return await customFetch<User>(
    `${endpoints.users.byId.replace('{id}', id)}`,
    undefined,
    {
      method: 'GET',
      headers: getAuthHeaders(token),
    },
  );
};
