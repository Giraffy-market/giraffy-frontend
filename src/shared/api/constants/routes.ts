export const routes = {
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
    profile: '/user/profile',
    byId: '/users/{id}',
  },
};
