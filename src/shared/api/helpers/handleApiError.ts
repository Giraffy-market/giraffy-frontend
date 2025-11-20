import { HttpError } from '@/shared/api/errors/http-error';

export const handleApiError = (error: unknown) => {
  if (error instanceof HttpError && error.detail) {
    return error.detail;
  }

  return 'Невідома помилка';
};
