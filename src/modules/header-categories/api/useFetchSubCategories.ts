import { useQuery } from '@tanstack/react-query';

import { fetchSubCategories } from '@/modules/categories/api/fetchSubCategories';
import type { CategoryItem } from '@/modules/categories/types/CategoryItem';

import { categoryKeys } from '../constants/constants';

export const useFetchSubCategories = (activeParentCategoryId: number) => {
  const { data, error, isLoading, refetch } = useQuery<CategoryItem[]>({
    queryKey: [categoryKeys.sub, activeParentCategoryId],
    queryFn: () => fetchSubCategories(activeParentCategoryId || 0),
    enabled: activeParentCategoryId !== null,
  });

  return { data, error, isLoading, refetch };
};
