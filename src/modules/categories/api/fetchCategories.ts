import { useQuery } from '@tanstack/react-query';

import type { CategoryItem } from '@/modules/categories/types/CategoryItem';

import { STALE_TIME, endpoints } from '@/shared/api/constants/endpoints';
import type { HttpErrorType } from '@/shared/api/errors/http-error';
import { customFetch } from '@/shared/api/fetch';

export const categoriesKeys = {
  all: 'categories',
};

export const useFetchCategories = () => {
  return useQuery<CategoryItem[], HttpErrorType>({
    queryKey: [categoriesKeys.all],
    queryFn: () => customFetch(endpoints.categories.base),
    staleTime: STALE_TIME,
  });
};
