'use client';

import { useQuery } from '@tanstack/react-query';

import type { ProductsListResponse } from '@/modules/products/types/Product';

import { STALE_TIME, endpoints } from '@/shared/api/constants/endpoints';
import type { HttpError } from '@/shared/api/errors/http-error';
import { customFetch } from '@/shared/api/fetch';
import { components } from '@/shared/api/schema';
import { MOCK_PRODUCTS } from '@/shared/mock/products.data';

type ProductRead = components['schemas']['ProductRead'];

export const useFetchProducts = (filters?: any) => {
  const queryString = new URLSearchParams(
    Object.entries(filters || {}).reduce(
      (acc, [key, value]) => {
        if (value) acc[key] = String(value);
        return acc;
      },
      {} as Record<string, string>,
    ),
  ).toString();

  return useQuery<ProductsListResponse, HttpError>({
    queryKey: ['products', filters] as const,
    queryFn: async () => {
      const response = await customFetch<ProductsListResponse>(
        endpoints.products.base,
        queryString,
      );

      if (response.items.length < 10) {
        const filteredMocks = MOCK_PRODUCTS.filter((p: any) => {
          const matchCity = filters?.city
            ? p.location?.toLowerCase().includes(filters.city.toLowerCase())
            : true;
          const matchMin = filters?.minPrice
            ? p.price >= Number(filters.minPrice)
            : true;
          const matchMax = filters?.maxPrice
            ? p.price <= Number(filters.maxPrice)
            : true;
          return matchCity && matchMin && matchMax;
        });

        return {
          ...response,
          items: [
            ...(response.items as any[]),
            ...(filteredMocks as any[]),
          ] as ProductRead[],
          total: response.total + filteredMocks.length,
        } as ProductsListResponse;
      }

      return response;
    },
    staleTime: STALE_TIME,
  });
};
