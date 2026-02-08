import { makeEndpoints } from './root';

export const API = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;
export const STALE_TIME = 300_000;

export const endpoints = {
  auth: {
    register: '/auth/register',
    verify_code: '/auth/verify_code',
    resend_verification_code: '/auth/resend-verification-code',
    login: '/auth/user_login',
    logout: '/auth/user_logout',
    refresh: '/auth/refresh',
    request: '/auth/request',
    confirm: '/auth/confirm',
  },
  users: {
    me: '/users/me',
    ...makeEndpoints('/users'),
  },
  categories: {
    base: '/categories',
    ...makeEndpoints('/categories'),
  },
  products: {
    base: '/products',
    ...makeEndpoints('/products'),
  },

  support_tickets: {
    base: '/support/tickets',
  },
};
