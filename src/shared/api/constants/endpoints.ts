export const API = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;
export const STALE_TIME = 300_000; // 5 minutes

export const endpoints = {
  categories: {
    base: '/categories',
  },
  products: {
    base: '/products',
  },

  support_tickets: {
    base: '/support/tickets',
  },
};
