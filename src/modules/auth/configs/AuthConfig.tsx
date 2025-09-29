import { type AuthOptions, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import { API_ENDPOINTS_AUTH } from '@/modules/auth/constans/routes';
import type { LoginResponse } from '@/modules/auth/type/types';

import { httpClient } from '@/shared/api/httpClient';

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'username',
          type: 'text',
          placeholder: 'ім`я користувача',
        },
        password: {
          label: 'Пароль',
          type: 'password',
          placeholder: 'Введіть пароль',
        },
      },
      // @ts-expect-error next-auth err
      authorize: async (credentials, req) => {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;
        const axiosClient = await httpClient();
        const response = await axiosClient
          .post<LoginResponse>(API_ENDPOINTS_AUTH.AUTH.AUTHENTICATION_LOGIN, {
            username: username,
            password: password,
          })
          .then((res) => res)
          .catch((err) => console.log(err.response.data));

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
