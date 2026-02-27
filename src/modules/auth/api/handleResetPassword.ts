import { endpoints } from '@/shared/api/constants/endpoints';
import { customFetch } from '@/shared/api/fetch';

// import { mockRequest } from '@/shared/mock/mockRequest';

import type { ResetPasswordResponse } from '../type/types';

type HandleResetPasswordProps = {
  token: string;
  new_password: string;
};

export const handleResetPassword = async (data: HandleResetPasswordProps) => {
  try {
    const response = await customFetch<ResetPasswordResponse>(
      endpoints.auth.confirm,
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
