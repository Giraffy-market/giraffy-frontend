import { makeEndpoints } from './root';

export const API = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;
export const STALE_TIME = 300_000;

export const endpoints = {
  auth: {
    register: '/auth/register',
    login: '/auth/user_login',
    logout: '/auth/user_logout',
    refresh: '/auth/refresh',
    request: '/auth/request',
    confirm: '/auth/confirm',
    verify_code: '/auth/verify_code',
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
};
