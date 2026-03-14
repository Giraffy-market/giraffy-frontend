import { makeEndpoints } from './root';

// export const API = `${process.env.NEXT_PUBLIC_API_BASE_URL}`;

const isServer = typeof window === 'undefined';

export const API = isServer
  ? `${process.env.NEXT_PUBLIC_API_BASE_URL}`
  : '/api';

export const STALE_TIME = 300_000;

export const endpoints = {
  auth: {
    register: '/server/auth/register',
    verify_code: '/auth/verify_code',
    resend_verification_code: '/auth/resend-verification-code',
    login: '/server/auth/user_login',
    logout: '/auth/user_logout',
    refresh: '/auth/refresh',
    request: '/auth/request',
    confirm: '/auth/confirm',
  },
  auth_google: {
    authorize: '/auth/google/authorize',
    callback: '/auth/google/callback',
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
