import { ErrorType } from '../shared/types/ErrorType';

export const getErrorType = (error: unknown): ErrorType => {
  if (!error) return 'unknown';

  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    if (message.includes('404')) return '404';
    if (message.includes('500')) return '500';
    if (message.includes('network')) return 'network';
  }

  return 'unknown';
};
