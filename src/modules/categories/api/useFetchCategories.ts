import { useQuery } from '@tanstack/react-query';

import { fetchCategories } from '@/modules/categories/api/fetchCategories';
import type { CategoryItem } from '@/modules/categories/types/CategoryItem';

import { STALE_TIME } from '@/shared/api/constants/endpoints';
import type { HttpErrorType } from '@/shared/api/errors/http-error';

export const categoriesKeys = {
  all: ['categories'],
};

export const useFetchCategories = () =>
  useQuery<CategoryItem[], HttpErrorType>({
    queryKey: categoriesKeys.all,
    queryFn: fetchCategories,
    staleTime: STALE_TIME,
  });
