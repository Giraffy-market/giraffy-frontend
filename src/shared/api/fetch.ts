import { API } from '@/shared/api/constants/endpoints';
import { HttpError, type HttpErrorType } from '@/shared/api/errors/http-error';
import type { HttpStatuses } from '@/shared/api/errors/types';

export const customFetch = async <Tresp>(
  endpoint: string,
  searchParams?: string,
  init?: RequestInit,
): Promise<Tresp> => {
  const headers = new Headers(init?.headers || {});

  let actualParams = searchParams;
  if (searchParams && searchParams.length > 30) {
    headers.set('Authorization', `Bearer ${searchParams}`);
    actualParams = '';
  }
  const fullUrl = `${API}${endpoint}${searchParams ? `?${searchParams}` : ''}`;

  if (!(init?.body instanceof FormData)) {
    headers.set('Content-Type', 'application/json');
  }

  const resp = await fetch(fullUrl, {
    ...init,
    headers,
  });
  const contentType = resp.headers.get('content-type');
  const isJson = contentType && contentType.includes('application/json');
  let body: Tresp | HttpErrorType | null = null;
  if (isJson) {
    try {
      body = await resp.json();
    } catch (e) {
      body = null;
    }
  }

  if (!resp.ok) {
    const errorData: HttpErrorType = body || {
      detail:
        resp.status === 503
          ? 'Сервіс тимчасово недоступний (503). Спробуйте пізніше.'
          : `Сталася помилка при виконанні запиту (${resp.status})`,
    };

    throw new HttpError(resp.status as HttpStatuses, errorData);
  }

  if (!isJson && resp.status !== 204) {
    throw new Error('Очікувався JSON, але сервер надіслав щось інше');
  }

  if (resp.status === 204) {
    return {} as Tresp;
  }

  return body as Tresp;
};
