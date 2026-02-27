import { endpoints } from '@/shared/api/constants/endpoints';
import { customFetch } from '@/shared/api/fetch';

export const handleGoogleLoginAction = async () => {
  try {
    const data = await customFetch<{ authorization_url: string }>(
      endpoints.auth_google.authorize,
      '',
      { method: 'GET' },
    );

    if (data?.authorization_url) {
      window.location.href = data.authorization_url;
    } else {
      console.error('URL авторизації не отриман:', data);
      throw new Error('URL авторизації не отриман');
    }
  } catch (error) {
    console.error('Помилка при отриманні Google Auth:', error);
    throw error;
  }
};
