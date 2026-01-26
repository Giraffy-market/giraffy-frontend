import { useMutation } from '@tanstack/react-query';

import { type CreateTicketFormValues } from '../types/types';

import { API, endpoints } from '@/shared/api/constants/endpoints';

const postTicket = async (data: CreateTicketFormValues) => {
  const response = await fetch(`${API}${endpoints.support_tickets.base}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error('Не вдалося відправити запит. Спробуйте пізніше.');
  }

  return response.json();
};

export const useCreateTicket = (onSuccessCallback: () => void) => {
  return useMutation({
    mutationFn: postTicket,
    onSuccess: () => {
      onSuccessCallback();
    },
    onError: (error: Error) => {
      console.error('Mutation error:', error.message);
    },
  });
};
