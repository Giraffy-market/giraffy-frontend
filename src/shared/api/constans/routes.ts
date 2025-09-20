const makeEndpoints = (base: string) => ({
  ROOT: base,
  CREATE: base,
  BY_ID: (id: string | number) => `${base}/${id}`,
  UPDATE: (id: string | number) => `${base}/${id}`,
  DELETE: (id: string | number) => `${base}/${id}`,
});

export const API_ENDPOINTS = {
  NOTIFICATION: {
    ...makeEndpoints('/notifications'),
  },
  PRODUCTS: {
    ...makeEndpoints('/products/create'),
    BY_PRODUCT: (id: string | number) => `/products/${id}`,
  },
  FAQ: {
    ...makeEndpoints('/faq/'),
  },
  COMMENTS: {
    ...makeEndpoints('/comments/product'),
  },
  WISHLISTS: {
    ...makeEndpoints('/wishlist/add'),
    WISHLIST_USER: (user_id: string | number) => `/wishlists/${user_id}`,
  },
  SEARCH: {
    ...makeEndpoints('/search/search'),
  },
  AUTH: {
    REGISTER: '/auth/register',
    AUTHENTICATION_LOGIN: '/auth/jwt/login',
    AUTHENTICATION_LOGOUT: '/auth/jwt/logout',
    AUTHENTICATION_FORGOT: '/auth/forgot-password',
    AUTHENTICATION_RESET: '/auth/reset-password',
    REQUEST_VERIFY_TOKEN: '/auth/request-verify-token',
    AUTHENTICATION_VERIFY: '/auth/verify',
  },
  USERS: {
    ME: '/users/me',
    AVATAR: '/users/user/avatar',
  },
  GOOGLE_AUTH: {
    AUTHORIZE: '/auth/google/authorize',
    CALLBACK: '/auth/google/callback',
  },
  CATEGORIES: {
    ...makeEndpoints('/categories/public/categories'),
    SUBCATEGORIES: (parentId: string | number) =>
      `/categories/public/categories/${parentId}/subcategories`,
  },
  REGISTRATION: {
    SEND_CODE: '/registration/send_code',
    VERIFY_CODE: '/registration/verify_code',
  },
  RESET_PASSWORD: {
    REQUEST: '/reset/request',
    CONFIRM: '/reset/confirm',
  },
  SUPPORT: {
    TICKET: '/support/ticket',
  },
  DEFAULT: {
    AUTHENTICATED_ROUTE: '/authenticated-route',
    BUTTON: '/button',
  },
};
