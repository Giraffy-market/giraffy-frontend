import { endpoints } from '@/shared/api/constants/endpoints';
import { customFetch } from '@/shared/api/fetch';
import { handleApiError } from '@/shared/api/helpers/handleApiError';

import type { RegisterResponse } from '../type/types';

type HandleRegisterProps = {
  email: string;
  password: string;
  phone_number: string;
};

export const handleRegister = async (data: HandleRegisterProps) => {
  try {
    const response = await customFetch<RegisterResponse>(
      endpoints.auth.register,
      '',
      {
        method: 'POST',
        body: JSON.stringify(data),
      },
    );

    return response;
  } catch (error) {
    const errorMsg = handleApiError(error);
    throw errorMsg;
  }
};
