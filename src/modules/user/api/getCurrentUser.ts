import { endpoints } from '@/shared/api/constants/endpoints';
import { customFetch } from '@/shared/api/fetch';
import type { User } from '@/shared/types';

import { getAuthHeaders } from './getAuthHeaders';

export const getCurrentUser = async (token: string) => {
  return await customFetch<User>(endpoints.users.me, undefined, {
    method: 'GET',
    headers: getAuthHeaders(token),
  });
};
