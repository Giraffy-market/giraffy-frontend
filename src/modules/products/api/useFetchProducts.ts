'use client';

import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';

import type { ProductsListResponse } from '@/modules/products/types/Product';

import { STALE_TIME, endpoints } from '@/shared/api/constants/endpoints';
import type { HttpError } from '@/shared/api/errors/http-error';
import { customFetch } from '@/shared/api/fetch';

export const productsKey = {
  all: 'products',
};

export const useFetchProducts = () => {
  const searchParams = useSearchParams()?.toString();

  return useQuery<ProductsListResponse, HttpError>({
    queryKey: [productsKey.all, searchParams],
    queryFn: () =>
      customFetch<ProductsListResponse>(endpoints.products.base, searchParams),
    staleTime: STALE_TIME,
  });
};
