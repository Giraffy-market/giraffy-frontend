import { type AvatarUploadResponse } from '../types/types';

import { endpoints } from '@/shared/api/constants/endpoints';
import { customFetch } from '@/shared/api/fetch';

export const handleDeleteAvatar = async (
  token: string,
): Promise<AvatarUploadResponse> => {
  return await customFetch<AvatarUploadResponse>(
    endpoints.users.avatar,
    token,
    {
      method: 'DELETE',
    },
  );
};
