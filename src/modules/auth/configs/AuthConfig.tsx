import { type AuthOptions, type Session, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import type { LoginResponse } from '@/modules/auth/type/types';

import { routes } from '@/shared/api/constans/routes';
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
      authorize: async (credentials) => {
        if (!credentials?.username || !credentials?.password) return null;
        const { username, password } = credentials;
        const axiosClient = await httpClient();
        const response = await axiosClient
          .post<LoginResponse>(
            routes.auth.login,
            new URLSearchParams({
              grant_type: 'password',
              username,
              password,
            }),
            {
              headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            },
          )
          .then((res) => res)
          .catch((err) => console.log(err.response.data));

        if (!response?.data) return null;

        return response.data;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) return { ...token, ...user };

      return token;
    },
    session: async ({ session, token }) => {
      session.access_token = token.access_token;
      // session.refreshToken = token.refreshToken;

      return session;
    },
  },
};

export const getServerAuthSession = (): Promise<Session | null> =>
  getServerSession(authOptions);
