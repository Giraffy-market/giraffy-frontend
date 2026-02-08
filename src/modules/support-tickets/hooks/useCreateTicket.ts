import { toast } from 'react-toastify';

import { useMutation } from '@tanstack/react-query';

import { handleCreateTicket } from '../api/handleCreateTicket';

import { handleApiError } from '@/shared/api/helpers/handleApiError';

export const useCreateTicket = (onSuccessCallback?: () => void) => {
  return useMutation({
    mutationFn: handleCreateTicket,
    onSuccess: () => {
      toast.success('Запит успішно надіслано!');
      onSuccessCallback?.();
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

      toast.error(displayMessage || 'Не вдалося надіслати запит');
    },
  });
};
