const BASE_AUTH = 'auth';

export const API_ENDPOINTS_AUTH = {
  AUTH: {
    REGISTER: `${BASE_AUTH}/register`,
    AUTHENTICATION_LOGIN: `${BASE_AUTH}/jwt/login`,
    AUTHENTICATION_LOGOUT: `${BASE_AUTH}/jwt/logout`,
    AUTHENTICATION_FORGOT: `${BASE_AUTH}/forgot-password`,
    AUTHENTICATION_RESET: `${BASE_AUTH}/reset-password`,
    REQUEST_VERIFY_TOKEN: `${BASE_AUTH}/request-verify-token`,
    AUTHENTICATION_VERIFY: `${BASE_AUTH}/verify`,
  },
};
