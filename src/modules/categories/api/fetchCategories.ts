import axios from 'axios';

import { API_BASE_URL } from '../constants/constants';

export const fetchCategories = async () => {
  const response = await axios.get(
    `${API_BASE_URL}/categories/public/categories`,
  );
  return response.data;
};
