import type { UseFormSetError } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useMutation } from '@tanstack/react-query';

import type { LoginFormValues } from '../components/LoginForm/types/types';

import { handleLoginAction } from '../api/handleLogin';

import { handleApiError } from '@/shared/api/helpers/handleApiError';

export const useLogin = (setError?: UseFormSetError<LoginFormValues>) => {
  return useMutation({
    mutationFn: handleLoginAction,
    onSuccess: () => {
      toast.success('Ви успішно увійшли!');
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

      if (setError) {
        if (
          lowerMessage.includes('поштою') ||
          lowerMessage.includes('акаунт')
        ) {
          setError('email', { type: 'manual', message: displayMessage });
        } else {
          setError('password', { type: 'manual', message: displayMessage });
        }
      }

      toast.error(displayMessage);
    },
  });
};
