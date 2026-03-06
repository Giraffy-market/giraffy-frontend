'use client';

import { useQuery } from '@tanstack/react-query';

import type { ProductsListResponse } from '@/modules/products/types/Product';

import { STALE_TIME, endpoints } from '@/shared/api/constants/endpoints';
import type { HttpError } from '@/shared/api/errors/http-error';
import { customFetch } from '@/shared/api/fetch';
import type { components } from '@/shared/api/schema';
import { MOCK_PRODUCTS } from '@/shared/mock/products.data';

type ProductRead = components['schemas']['ProductRead'];

interface ProductFilters {
  minPrice?: string | number;
  maxPrice?: string | number;
  city?: string | string[];
  category?: string | string[];
  status?: string | string[];
  search?: string;
}

export const useFetchProducts = (filters?: ProductFilters) => {
  const params = new URLSearchParams();

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((v) => params.append(key, String(v)));
      } else if (value) {
        params.append(key, String(value));
      }
    });
  }

  return useQuery<ProductsListResponse, HttpError>({
    queryKey: ['products', filters] as const,
    queryFn: async (): Promise<ProductsListResponse> => {
      const response = await customFetch<ProductsListResponse>(
        endpoints.products.base,
        params.toString(),
      ).catch(() => ({ items: [], total: 0 }));

      const filteredMocks = MOCK_PRODUCTS.filter((p: ProductRead) => {
        const searchTerm = filters?.search?.trim().toLowerCase() || '';
        if (searchTerm && !p.title?.toLowerCase().includes(searchTerm))
          return false;

        if (filters?.minPrice && p.price < Number(filters.minPrice))
          return false;
        if (filters?.maxPrice && p.price > Number(filters.maxPrice))
          return false;

        if (
          filters?.city &&
          Array.isArray(filters.city) &&
          filters.city.length > 0
        ) {
          const activeCities = filters.city.filter(Boolean);
          if (activeCities.length > 0) {
            const matchCity = activeCities.some(
              (c: string) => p.location?.toLowerCase() === c.toLowerCase(),
            );
            if (!matchCity) return false;
          }
        }

        if (
          filters?.status &&
          Array.isArray(filters.status) &&
          filters.status.length > 0
        ) {
          const activeStatuses = filters.status.filter(Boolean);
          if (activeStatuses.length > 0) {
            const matchStatus = activeStatuses.some(
              (s: string) =>
                (s === 'new' && p.is_new) || (s === 'used' && !p.is_new),
            );
            if (!matchStatus) return false;
          }
        }

        if (filters?.category) {
          const categories = Array.isArray(filters.category)
            ? filters.category
            : [filters.category];

          const activeCats = categories.filter(Boolean);

          if (activeCats.length > 0) {
            const catMap: Record<string, number> = {
              electronics: 1,
              kids: 2,
              kitchen: 3,
              clothes: 4,
              hobbies: 5,
              house: 2,
              pets: 100,
              transport: 7,
              beauty: 6,
            };

            const matchCategory = activeCats.some((cat: string) => {
              const targetId = catMap[cat] || Number(cat);
              return p.category_id === targetId;
            });

            if (!matchCategory) return false;
          }
        }

        return true;
      });

      return {
        items: [...(response.items || []), ...filteredMocks],
        total: (response.total || 0) + filteredMocks.length,
      } as unknown as ProductsListResponse;
    },
    staleTime: STALE_TIME,
  });
};
