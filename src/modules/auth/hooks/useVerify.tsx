import type { UseFormSetError } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useMutation } from '@tanstack/react-query';

import { handleVerify } from '../api/handleVerify';

import { handleApiError } from '@/shared/api/helpers/handleApiError';

interface VerifyCodeFormValues {
  kod: string;
}

export const useVerify = (setError?: UseFormSetError<VerifyCodeFormValues>) => {
  return useMutation({
    mutationFn: handleVerify,
    onError: (error: unknown) => {
      const rawMessages = handleApiError(error);

      const errorString = Array.isArray(rawMessages)
        ? rawMessages.join(' ')
        : rawMessages;

      const displayMessage = Array.isArray(rawMessages)
        ? rawMessages.join('\n')
        : rawMessages;

      const lowerMessage = errorString.toLowerCase();
      if (
        lowerMessage.includes('занадто багато') ||
        lowerMessage.includes('спробуйте пізніше')
      ) {
        toast.error(displayMessage);
        return;
      }
      if (setError) {
        setError('kod', {
          type: 'server',
          message: displayMessage || 'Невірний код',
        });
      } else {
        toast.error(displayMessage || 'Помилка верифікації');
      }
    },
  });
};
