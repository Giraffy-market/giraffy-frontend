import { toast } from 'react-toastify';

import { useMutation } from '@tanstack/react-query';

import { handleResendCode } from '../api/handleResendCode';

import { handleApiError } from '@/shared/api/helpers/handleApiError';

export const useResendCode = (onSuccessCallback: () => void) => {
  return useMutation({
    mutationFn: handleResendCode,
    onSuccess: () => {
      toast.success('Код відправлено повторно');
      onSuccessCallback();
    },
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
