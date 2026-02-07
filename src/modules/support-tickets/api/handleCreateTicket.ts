import { type CreateTicketFormValues } from '../types/types';

import { endpoints } from '@/shared/api/constants/endpoints';
import { customFetch } from '@/shared/api/fetch';

// import { mockRequest } from '@/shared/mock/mockRequest';

export const handleCreateTicket = async (data: CreateTicketFormValues) => {
  return await customFetch(endpoints.support_tickets.base, '', {
    method: 'POST',
    body: JSON.stringify(data),
  });

  //FAKE TEST
  // return await mockRequest(data);
};
