import type { ElementType } from 'react';

import type {
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';

type RefetchFn = (
  options?: RefetchOptions,
) => Promise<QueryObserverResult<unknown, unknown>>;
type RetryFn = RefetchFn | (() => void);

export type ErrorProps = {
  errorCode?: number;
  Icon?: ElementType;
  title: string | string[];
  description: string;
  onRetry?: RetryFn;
  showUpdateButton?: boolean;
};
