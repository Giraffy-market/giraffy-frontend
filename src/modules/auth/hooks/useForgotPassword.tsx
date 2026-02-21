import { UseFormSetError } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useMutation } from '@tanstack/react-query';

import { ForgotPasswordFormValues } from '../components/ForgotPasswordForm/types/types';

import { handleForgotPassword } from '../api/handleForgotPassword';

import { handleApiError } from '@/shared/api/helpers/handleApiError';

export const useForgotPassword = (
  setError: UseFormSetError<ForgotPasswordFormValues>,
) => {
  return useMutation({
    mutationFn: handleForgotPassword,
    onSuccess: () => {},
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

      toast.error(displayMessage || 'Не вдалося відправити код');
    },
  });
};
