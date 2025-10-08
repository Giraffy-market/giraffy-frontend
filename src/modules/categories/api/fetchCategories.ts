import axios from 'axios';

import { API_BASE_URL } from '../constants/constants';
import type { CategoryItem } from '../types/CategoryItem';

export const fetchCategories = async (): Promise<CategoryItem[]> => {
  const response = await axios.get(
    `${API_BASE_URL}/categories/public/categories`,
  );

  return response.data;
};
