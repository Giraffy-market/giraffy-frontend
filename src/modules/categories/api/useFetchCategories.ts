'use client';

import { useQuery } from '@tanstack/react-query';

import type { CategoryItem } from '@/modules/categories/types/CategoryItem';

import { STALE_TIME } from '@/shared/api/constants/endpoints';
import type { HttpErrorType } from '@/shared/api/errors/http-error';

const MOCK_CATEGORIES: CategoryItem[] = [
  {
    category_id: 1,
    name: 'Електроніка',
    slug: 'електроніка',
    image_url: '/categories/elec.png',
    children: [
      { category_id: 101, name: 'Смартфони', slug: 'смартфони', children: [] },
      { category_id: 102, name: 'Планшети', slug: 'планшети', children: [] },
      { category_id: 103, name: 'Комп’ютери', slug: 'компютери', children: [] },
      { category_id: 104, name: 'Аксесуари', slug: 'аксесуари', children: [] },
      { category_id: 105, name: 'Побутова техніка', slug: 'побутова-техніка', children: [] },
      { category_id: 106, name: 'Ноутбуки', slug: 'ноутбуки', children: [] },
      { category_id: 107, name: 'Фото і відео', slug: 'фото-і-відео', children: [] },
      { category_id: 108, name: 'Смарт-гаджети', slug: 'смарт-гаджети', children: [] }
    ]
  },
  {
    category_id: 2,
    name: 'Дім',
    slug: 'дім',
    image_url: '/categories/home.png',
    children: [
      { category_id: 201, name: 'Меблі', slug: 'меблі', children: [] },
      { category_id: 202, name: 'Декор', slug: 'декор', children: [] },
      { category_id: 203, name: 'Освітлення', slug: 'освітлення', children: [] },
      { category_id: 204, name: 'Зберігання', slug: 'зберігання', children: [] },
      { category_id: 205, name: 'Канцелярія', slug: 'канцелярія', children: [] },
      { category_id: 206, name: 'Інструменти', slug: 'інструменти', children: [] }
    ]
  },
  {
    category_id: 3,
    name: 'Дитячі товари',
    slug: 'дитячі-товари',
    image_url: '/categories/kids.png',
    children: [
      { category_id: 301, name: 'Іграшки', slug: 'іграшки', children: [] },
      { category_id: 302, name: 'Меблі дитячі', slug: 'меблі-дитячі', children: [] },
      { category_id: 303, name: 'Транспорт дитячий', slug: 'транспорт-дитячий', children: [] },
      { category_id: 304, name: 'Гігієна дитяча', slug: 'гігієна-дитяча', children: [] },
      { category_id: 305, name: 'Харчування дитяче', slug: 'харчування-дитяче', children: [] },
      { category_id: 306, name: 'Книги дитячі', slug: 'книги-дитячі', children: [] }
    ]
  },
  {
    category_id: 4,
    name: 'Кухня',
    slug: 'кухня',
    image_url: '/categories/kitchen.png',
    children: [
      { category_id: 401, name: 'Посуд', slug: 'посуд', children: [] },
      { category_id: 402, name: 'Техніка', slug: 'техніка', children: [] },
      { category_id: 403, name: 'Текстиль', slug: 'текстиль', children: [] },
      { category_id: 404, name: 'Зберігання', slug: 'зберігання', children: [] },
      { category_id: 405, name: 'Сервірування', slug: 'сервірування', children: [] },
      { category_id: 406, name: 'Гаджети', slug: 'гаджети', children: [] }
    ]
  },
  {
    category_id: 5,
    name: 'Хобі',
    slug: 'хобі',
    image_url: '/categories/hobby.png',
    children: [
      { category_id: 501, name: 'Настільні ігри', slug: 'настільні-ігри', children: [] },
      { category_id: 502, name: 'Пазли', slug: 'пазли', children: [] },
      { category_id: 503, name: 'Колекції', slug: 'колекції', children: [] },
      { category_id: 504, name: 'Хендмейд', slug: 'хендмейд', children: [] },
      { category_id: 505, name: 'Музика', slug: 'музика', children: [] },
      { category_id: 506, name: 'Творчість', slug: 'творчість', children: [] },
      { category_id: 507, name: 'Декор на свята', slug: 'декор-на-свята', children: [] }
    ]
  },
  {
    category_id: 6,
    name: 'Одяг і взуття',
    slug: 'одяг-і-взуття',
    image_url: '/categories/clothes.png',
    children: [
      { category_id: 601, name: 'Жіночий одяг', slug: 'жіночий-одяг', children: [] },
      { category_id: 602, name: 'Чоловічий одяг', slug: 'чоловічий-одяг', children: [] },
      { category_id: 603, name: 'Дитячий одяг', slug: 'дитячий-одяг', children: [] },
      { category_id: 604, name: 'Взуття жіноче', slug: 'взуття-жіноче', children: [] },
      { category_id: 605, name: 'Взуття чоловіче', slug: 'взуття-чоловіче', children: [] },
      { category_id: 606, name: 'Взуття дитяче', slug: 'взуття-дитяче', children: [] },
      { category_id: 607, name: 'Аксесуари', slug: 'аксесуари', children: [] },
      { category_id: 608, name: 'Спортивний одяг', slug: 'спортивний-одяг', children: [] },
      { category_id: 609, name: 'Спортивне взуття', slug: 'спортивне-взуття', children: [] },
      { category_id: 610, name: 'Верхній одяг', slug: 'верхній-одяг', children: [] }
    ]
  },
  {
    category_id: 7,
    name: 'Краса та догляд',
    slug: 'краса-та-догляд',
    image_url: '/categories/beauty.png',
    children: [
      { category_id: 701, name: 'Макіяж', slug: 'макіяж', children: [] },
      { category_id: 702, name: 'Волосся', slug: 'волосся', children: [] },
      { category_id: 703, name: 'Парфуми', slug: 'парфуми', children: [] },
      { category_id: 704, name: 'Догляд', slug: 'догляд', children: [] },
      { category_id: 705, name: 'Косметика', slug: 'косметика', children: [] },
      { category_id: 706, name: 'Гігієна', slug: 'гігієна', children: [] },
      { category_id: 707, name: 'Масажери', slug: 'масажери', children: [] }
    ]
  },
  {
    category_id: 8,
    name: 'Тварини',
    slug: 'тварини',
    image_url: '/categories/pets.png',
    children: [
      { category_id: 801, name: 'Для собак', slug: 'для-собак', children: [] },
      { category_id: 802, name: 'Для котів', slug: 'для-котів', children: [] },
      { category_id: 803, name: 'Для гризунів', slug: 'для-гризунів', children: [] },
      { category_id: 804, name: 'Для птахів', slug: 'для-птахів', children: [] },
      { category_id: 805, name: 'Акваріуми', slug: 'акваріуми', children: [] },
      { category_id: 806, name: 'Корм', slug: 'корм', children: [] },
      { category_id: 807, name: 'Лежаки та іграшки', slug: 'лежаки-та-іграшки', children: [] }
    ]
  },
  {
    category_id: 9,
    name: 'Транспорт',
    slug: 'транспорт',
    image_url: '/categories/transport.png',
    children: [
      { category_id: 901, name: 'Авто', slug: 'авто', children: [] },
      { category_id: 902, name: 'Мото', slug: 'мото', children: [] },
      { category_id: 903, name: 'Велосипеди', slug: 'велосипеди', children: [] },
      { category_id: 904, name: 'Електросамокати', slug: 'електросамокати', children: [] },
      { category_id: 905, name: 'Запчастини', slug: 'запчастини', children: [] },
      { category_id: 906, name: 'Аксесуари', slug: 'аксесуари', children: [] },
      { category_id: 907, name: 'Шини і мастила', slug: 'шини-і-мастила', children: [] }
    ]
  }
] as unknown as CategoryItem[];

export const categoriesKeys = {
  all: ['categories']
};

export const useFetchCategories = () =>
  useQuery<CategoryItem[], HttpErrorType>({
    queryKey: categoriesKeys.all,
    queryFn: async () => {
      return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_CATEGORIES), 300);
      });
    },
    staleTime: STALE_TIME
  });