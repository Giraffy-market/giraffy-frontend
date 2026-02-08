import type { UseFormSetError } from 'react-hook-form';
import { toast } from 'react-toastify';

import { useMutation } from '@tanstack/react-query';

import type { RegisterFormValues } from '../components/RegisterForm/types/types';

import { handleRegister } from '../api/handleRegister';

import { handleApiError } from '@/shared/api/helpers/handleApiError';

export const useRegister = (setError: UseFormSetError<RegisterFormValues>) => {
  return useMutation({
    mutationFn: handleRegister,

    onError: (error: unknown) => {
      // const messages = handleApiError(error);
      const rawMessages = handleApiError(error);

      // 1. Подготавливаем данные (как в useLogin и useVerify)
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

        if (lowerMessage.includes('mail')) {
          const emailSpecific = Array.isArray(rawMessages)
            ? rawMessages.find((m) => m.toLowerCase().includes('mail'))
            : displayMessage;

          setError('email', {
            type: 'server',
            message: emailSpecific || displayMessage,
          });
          isHandled = true;
        }

        if (lowerMessage.includes('phone') || lowerMessage.includes('номер')) {
          const phoneSpecific = Array.isArray(rawMessages)
            ? rawMessages.find(
                (m) =>
                  m.toLowerCase().includes('phone') ||
                  m.toLowerCase().includes('номер'),
              )
            : displayMessage;

          setError('phone_number', {
            type: 'server',
            message: phoneSpecific || displayMessage,
          });
          isHandled = true;
        }
      }

      if (!isHandled) {
        toast.error(displayMessage || 'Сталася помилка');
      }
    },
  });
};
