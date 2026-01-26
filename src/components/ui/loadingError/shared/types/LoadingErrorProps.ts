import type {
  QueryObserverResult,
  RefetchOptions,
} from '@tanstack/react-query';

type RefetchFn = (
  options?: RefetchOptions,
) => Promise<QueryObserverResult<unknown, unknown>>;

export type LoadingErrorProps = {
  refetch: RefetchFn;
  message: string;
  className?: string;
};
