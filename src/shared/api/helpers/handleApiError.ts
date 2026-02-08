import { HttpError } from '@/shared/api/errors/http-error';

interface ApiErrorResponse {
  data?: {
    error?: {
      message?: string | string[];
    };
  };
}

export const handleApiError = (error: unknown): string | string[] => {
  if (error instanceof HttpError) {
    const apiError = error as ApiErrorResponse;

    const serverMessage = apiError.data?.error?.message;

    return serverMessage || error.message;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return 'Невідома помилка';
};
