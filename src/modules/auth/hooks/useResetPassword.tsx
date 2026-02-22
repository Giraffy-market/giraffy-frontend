import type { UseFormSetError } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useMutation } from '@tanstack/react-query';

import { type ResetPasswordFormValues } from '../components/ResetPasswordForm/types/types';

import { handleResetPassword } from '../api/handleResetPassword';

import { handleApiError } from '@/shared/api/helpers/handleApiError';

export const useResetPassword = (
  setError: UseFormSetError<ResetPasswordFormValues>,
) => {
  return useMutation({
    mutationFn: handleResetPassword,

    onError: (error: unknown) => {
      const rawMessages = handleApiError(error);

      const errorString = Array.isArray(rawMessages)
        ? rawMessages.join(' ')
        : rawMessages;

      const displayMessage = Array.isArray(rawMessages)
        ? rawMessages.join('\n')
        : rawMessages;

      const lowerMessage = errorString.toLowerCase();
      let isHandled = false;

      if (
        lowerMessage.includes('занадто багато') ||
        lowerMessage.includes('спробуйте пізніше')
      ) {
        toast.error(displayMessage);
        return;
      }

      if (setError) {
        if (lowerMessage.includes('пароль')) {
          const passwordSpecific = Array.isArray(rawMessages)
            ? rawMessages
                .filter((m) => m.toLowerCase().includes('пароль'))
                .join('\n')
            : displayMessage;

          setError('password', { type: 'server', message: passwordSpecific });
          isHandled = true;
        }
      }

      if (!isHandled) {
        toast.error(displayMessage || 'Сталася помилка');
      }
    },
  });
};
