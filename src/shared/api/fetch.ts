import { API } from '@/shared/api/constants/endpoints';
import { HttpError } from '@/shared/api/errors/http-error';
import type { HttpStatuses } from '@/shared/api/errors/types';

export const customFetch = async <Tresp>(
  endpoint: string,
  searchParams?: string,
  init?: RequestInit,
): Promise<Tresp> => {
  const url = new URL(
    `${API}${endpoint}${searchParams ? `?${searchParams}` : ''}`,
  );

  const resp = await fetch(url, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  });
  const body = await resp.json();

  if (!resp.ok) {
    throw new HttpError(
      resp.status as HttpStatuses,
      body || 'Сталася помилка при виконанні запиту',
    );
  }

  return body;
};
