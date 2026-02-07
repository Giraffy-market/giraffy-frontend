import { endpoints } from '@/shared/api/constants/endpoints';
import { customFetch } from '@/shared/api/fetch';

export const handleResendCode = async (data: { email: string }) => {
  return await customFetch(endpoints.auth.resend_verification_code, undefined, {
    method: 'POST',
    body: JSON.stringify({
      email: data.email.trim(),
    }),
  });
};
