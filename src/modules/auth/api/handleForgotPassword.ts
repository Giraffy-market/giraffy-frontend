import { endpoints } from '@/shared/api/constants/endpoints';
import { customFetch } from '@/shared/api/fetch';

// import { mockRequest } from '@/shared/mock/mockRequest';

export const handleForgotPassword = async (data: { email: string }) => {
  return await customFetch(endpoints.auth.request, undefined, {
    method: 'POST',
    body: JSON.stringify({
      email: data.email.trim(),
    }),
  });

  //FAKE TEST
  // return await mockRequest(data);
};
