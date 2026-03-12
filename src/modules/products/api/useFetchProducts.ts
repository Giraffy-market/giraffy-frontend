'use client';

import { useQuery } from '@tanstack/react-query';
import { usePathname, useSearchParams } from 'next/navigation';

import type { Product } from '@/shared/mock/products.data';
import { MOCK_PRODUCTS } from '@/shared/mock/products.data';

const categoryMap: Record<string, number> = {
  електроніка: 1,
  'для дому': 2,
  'дитячі товари': 3,
  кухня: 4,
  'хобі та розваги': 5,
  'одяг та взуття': 6,
  'краса та догляд': 7,
  тварини: 8,
  транспорт: 9,
};

interface FetchProductsResponse {
  items: Product[];
  total: number;
}

export const useFetchProducts = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const categorySlug = pathname.startsWith('/category/')
    ? decodeURIComponent(pathname.split('/').pop() || '')
    : null;

  return useQuery<FetchProductsResponse>({
    queryKey: ['products', categorySlug, searchParams.toString()],
    queryFn: async () => {
      let filtered = [...MOCK_PRODUCTS];

      if (categorySlug) {
        const targetId = categoryMap[categorySlug.toLowerCase()];
        if (targetId) {
          filtered = filtered.filter((p) => p.category_id === targetId);
        }
      }

      const minPrice = Number(searchParams.get('minPrice'));
      const maxPrice = Number(searchParams.get('maxPrice'));
      if (minPrice) filtered = filtered.filter((p) => p.price >= minPrice);
      if (maxPrice) filtered = filtered.filter((p) => p.price <= maxPrice);

      const city = searchParams.get('city');
      if (city) filtered = filtered.filter((p) => p.location === city);

      const isNew = searchParams.get('is_new');
      if (isNew === 'true')
        filtered = filtered.filter((p) => p.is_new === true);
      if (isNew === 'false')
        filtered = filtered.filter((p) => p.is_new === false);

      return { items: filtered, total: filtered.length };
    },
  });
};
