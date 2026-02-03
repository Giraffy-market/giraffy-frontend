import { endpoints } from '@/shared/api/constants/endpoints';
import { customFetch } from '@/shared/api/fetch';
import { handleApiError } from '@/shared/api/helpers/handleApiError';

import type { VerifyResponse } from '../type/types';

type HandleVerifyProps = {
  email: string;
  kod: string;
};

export const handleVerify = async (data: HandleVerifyProps) => {
  try {
    const response = await customFetch<VerifyResponse>(
      endpoints.auth.verify_code,
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
