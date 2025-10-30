import { useQuery } from '@tanstack/react-query';

import { fetchCategories } from '@/modules/categories/api/fetchCategories';
import type { CategoryItem } from '@/modules/categories/types/CategoryItem';

import { categoryKeys } from '../constants/constants';

export const useFetchParentCategories = () => {
  const { data, error, isLoading, refetch } = useQuery<CategoryItem[]>({
    queryKey: [categoryKeys.parent],
    queryFn: fetchCategories,
  });

  return { data, error, isLoading, refetch };
};
