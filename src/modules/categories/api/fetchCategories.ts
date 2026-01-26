import type { CategoryItem } from '@/modules/categories/types/CategoryItem';

import { endpoints } from '@/shared/api/constants/endpoints';
import { customFetch } from '@/shared/api/fetch';

export const fetchCategories = async (): Promise<CategoryItem[]> => {
  return customFetch(endpoints.categories.base);
};
