import { toast } from 'react-toastify';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';

import { handleUpdateAvatar } from '../api/handleUpdateAvatar';

interface AvatarResponse {
  avatar_url?: string;
  url?: string;
}

export const useUpdateAvatar = () => {
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  return useMutation<AvatarResponse, Error, File>({
    mutationFn: (file: File) => {
      const token = session?.access_token;
      console.log('TOKEN FOR AVATAR:', token);
      if (!token) throw new Error('Unauthorized');

      return handleUpdateAvatar(file, token);
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
