import type { UpdateUserPayload } from '../types/types';

import { endpoints } from '@/shared/api/constants/endpoints';
import { customFetch } from '@/shared/api/fetch';
import type { User } from '@/shared/types';

import { getAuthHeaders } from './getAuthHeaders';

export const updateUser = async (token: string, data: UpdateUserPayload) => {
  return await customFetch<User>(endpoints.users.me, undefined, {
    method: 'PATCH',
    headers: {
      ...getAuthHeaders(token),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
};
