import axios from 'axios';

import type { CategoryItem } from '../types/CategoryItem';

import { API_BASE_URL } from '../constants/constants';

export const fetchSubCategories = async (
  parentCategoryId: number,
): Promise<CategoryItem[]> => {
  const response = await axios.get(
    `${API_BASE_URL}/categories/public/categories/${parentCategoryId}/subcategories`,
  );

  return response.data;
};
