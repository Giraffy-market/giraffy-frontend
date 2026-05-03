import { toast } from 'react-toastify';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { handleDeleteAvatar } from '../api/handleDeleteAvatar';
import { handleUpdateAvatar } from '../api/handleUpdateAvatar';

interface AvatarResponse {
  avatar_url?: string;
  url?: string;
}

export const useUpdateAvatar = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation<AvatarResponse, Error, File | null>({
    mutationFn: (file: File | null) => {
      const token = session?.access_token;
      console.log('TOKEN FOR AVATAR:', token);
      if (!token) throw new Error('Unauthorized');

      if (file) {
        return handleUpdateAvatar(file, token);
      } else {
        return handleDeleteAvatar(token);
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['user', 'me'] });

      toast.success('Фото оновлено!');
    },
    onError: (error) => {
      console.error('Avatar upload error:', error);
      toast.error('Сталася помилка при завантаженні');
    },
  });
};
