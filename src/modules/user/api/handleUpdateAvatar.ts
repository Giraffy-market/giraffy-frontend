import type { AvatarUploadResponse } from '../types/types';

import { endpoints } from '@/shared/api/constants/endpoints';
import { customFetch } from '@/shared/api/fetch';

export const handleUpdateAvatar = async (
  file: File,
  token: string,
): Promise<AvatarUploadResponse> => {
  const formData = new FormData();

  formData.append('file', file);

  return await customFetch<AvatarUploadResponse>(
    endpoints.users.avatar,
    token,
    {
      method: 'POST',
      body: formData,
    },
  );
};
