import type { ElementType } from 'react';

import type {
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';

type RefetchFn = (
  options?: RefetchOptions,
) => Promise<QueryObserverResult<unknown, unknown>>;

export type ErrorProps = {
  Icon: ElementType;
  title: string | string[];
  description: string;
  refetch?: RefetchFn;
  showUpdateButton?: boolean;
};
