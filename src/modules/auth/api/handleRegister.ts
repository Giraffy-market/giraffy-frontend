import { routes } from '@/shared/api/constants/routes';
import { customFetch } from '@/shared/api/fetch';

import type { RegisterResponse } from '../type/types';

type HandleRegisterProps = {
  email: string;
  password: string;
  phone_number: string;
};

export const handleRegister = async (data: HandleRegisterProps) => {
  try {
    const response = await customFetch<RegisterResponse>(
      routes.auth.register,
      '',
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
    );

    return response;
  } catch (error) {
    throw error;
  }
};
