import type { PaginatedResponse } from '@/shared/api/types/PaginatedResponse';

export type Product = {
  product_id: number;
  title: string;
  description: string;
  price: number;
  category_id: number;
  location: string;
  status: 'for_moderation';
  is_new: boolean;
  published_date: string;
  comments_count: number;
};

export type ProductsListResponse = PaginatedResponse<Product>;
