import { endpoints } from '@/shared/api/constants/endpoints';
import { customFetch } from '@/shared/api/fetch';

// import { mockRequest } from '@/shared/mock/mockRequest';

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
  } catch (error: unknown) {
    throw error;
  }

  //FAKE TEST
  // return await mockRequest(data);
};
