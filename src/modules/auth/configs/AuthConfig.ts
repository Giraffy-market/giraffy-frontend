import { type AuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { API_ENDPOINTS_AUTH } from '@/modules/auth/constans/routes';
import type { LoginResponse } from '@/modules/auth/type/types';

import { httpClient } from '@/shared/api/httpClient';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Електронна пошта',
          type: 'email',
          placeholder: 'example@mail.com',
        },
        password: {
          label: 'Пароль',
          type: 'password',
          placeholder: 'Введіть пароль',
        },
      },
      authorize: async (credentials, req) => {
        if (!credentials?.email || !credentials?.password) return null;
        const { email, password } = credentials;
        const axiosClient = await httpClient();
        const response = await axiosClient
          .post<LoginResponse>(API_ENDPOINTS_AUTH.AUTH.AUTHENTICATION_LOGIN, {
            username: email,
            password: password,
          })
          .then((res) => res)
          .catch((err) => err);

        if (!response?.data) return null;

        return response.data;
      },
    }),
  ],
  callbacks: {
    session: async ({ token, session }) => {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      return session;
    },
  },
};

export const getServerAuthSession = () => getServerSession(authOptions);
