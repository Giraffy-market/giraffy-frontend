import { API } from '@/shared/api/constants/endpoints';
import { HttpError, type HttpErrorType } from '@/shared/api/errors/http-error';
import type { HttpStatuses } from '@/shared/api/errors/types';

// const MOCK_DATA: Record<string, unknown> = {
//   '/categories': [
//     { category_id: 1, name: 'Краса та догляд', image_url: null },
//     { category_id: 2, name: 'Електроніка', image_url: null },
//     { category_id: 3, name: 'Дім та сад', image_url: null },
//   ],
//   '/products': [
//     { id: 1, name: 'Крем для обличчя', price: 450, category_id: 1 },
//     { id: 2, name: 'Смартфон', price: 12000, category_id: 2 },
//   ],
// };

export const customFetch = async <Tresp>(
  endpoint: string,
  searchParams?: string,
  init?: RequestInit,
): Promise<Tresp> => {
  // if (
  //   endpoint.includes('/categories') ||
  //   endpoint.includes('/products') ||
  //   endpoint.includes('users/me')
  // ) {
  //   console.warn(`[MOCK] Повертаємо дані для ${endpoint}`);

  //   if (endpoint.includes('users/me')) {
  //     return { id: 1, name: 'Admin', email: 'test@test.com' } as Tresp;
  //   }

  //   const data = MOCK_DATA[endpoint] || [];

  //   return data as unknown as Tresp;
  // }

  // const url = new URL(
  //   `${API}${endpoint}${searchParams ? `?${searchParams}` : ''}`,
  // );

  const fullUrl = `${API}${endpoint}${searchParams ? `?${searchParams}` : ''}`;

  const resp = await fetch(fullUrl, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
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
