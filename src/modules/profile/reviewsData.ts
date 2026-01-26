import type { Review } from '@/shared/types';

import defaultAvatar from './assets/defaultAvatar.png';

export const reviewsData: Review[] = [
  {
    id: 1,
    user: {
      name: 'Марія І.',
      avatar: defaultAvatar,
    },
    rating: 4,
    text: 'Все пройшло чудово! Дуже приємний продавець, швидко відповідає.',
  },
  {
    id: 2,
    user: {
      name: 'Олександр П.',
      avatar: defaultAvatar,
    },
    rating: 5,
    text: 'Замовлення отримав у той же день. Рекомендую!',
  },
];
