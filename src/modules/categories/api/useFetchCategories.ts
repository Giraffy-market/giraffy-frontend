'use client';

import { useQuery } from '@tanstack/react-query';

import type { CategoryItem } from '@/modules/categories/types/CategoryItem';

import { STALE_TIME } from '@/shared/api/constants/endpoints';
import type { HttpErrorType } from '@/shared/api/errors/http-error';

const MOCK_CATEGORIES = [
  {
    id: 1,
    name: 'Електроніка',
    title: 'Електроніка',
    slug: 'електроніка',
    image_url: '/categories/elec.png',
  },
  {
    id: 2,
    name: 'Для дому',
    title: 'Для дому',
    slug: 'для-дому',
    image_url: '/categories/home.png',
  },
  {
    id: 3,
    name: 'Дитячі товари',
    title: 'Дитячі товари',
    slug: 'дитячі-товари',
    image_url: '/categories/kids.png',
  },
  {
    id: 4,
    name: 'Кухня',
    title: 'Кухня',
    slug: 'кухня',
    image_url: '/categories/kitchen.png',
  },
  {
    id: 5,
    name: 'Хобі та розваги',
    title: 'Хобі та розваги',
    slug: 'хобі-та-розваги',
    image_url: '/categories/hobby.png',
  },
  {
    id: 6,
    name: 'Одяг та взуття',
    title: 'Одяг та взуття',
    slug: 'одяг-та-взуття',
    image_url: '/categories/clothes.png',
  },
  {
    id: 7,
    name: 'Краса та догляд',
    title: 'Краса та догляд',
    slug: 'краса-та-догляд',
    image_url: '/categories/beauty.png',
  },
  {
    id: 8,
    name: 'Тварини',
    title: 'Тварини',
    slug: 'тварини',
    image_url: '/categories/pets.png',
  },
  {
    id: 9,
    name: 'Транспорт',
    title: 'Транспорт',
    slug: 'транспорт',
    image_url: '/categories/transport.png',
  },
] as unknown as CategoryItem[];

export const categoriesKeys = {
  all: ['categories'],
};

export const useFetchCategories = () =>
  useQuery<CategoryItem[], HttpErrorType>({
    queryKey: categoriesKeys.all,
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_CATEGORIES), 300);
      });
    },
    staleTime: STALE_TIME,
  });
