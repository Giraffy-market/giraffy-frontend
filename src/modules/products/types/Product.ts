import type { PaginatedResponse } from '@/shared/api/types/PaginatedResponse';

export type Product = {
  product_id: number;
  title: string;
  description: string;
  price: number;
  category_id: number;
  location: string;
  status: 'for_moderation';
};

export type ProductsListResponse = PaginatedResponse<Product>;
