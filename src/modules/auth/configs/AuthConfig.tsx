import { type AuthOptions, type Session, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import type { LoginResponse } from '@/modules/auth/type/types';

import { routes } from '@/shared/api/constants/routes';
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
        email: {
          label: 'Електронна пошта',
          type: 'email',
          placeholder: 'example@mail.com',
          required: true,
        },
        password: {
          label: 'Пароль',
          type: 'password',
          placeholder: 'Введіть пароль',
          required: true,
        },
      },
      // @ts-expect-error next-auth err
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const axiosClient = await httpClient();

          const { data } = await axiosClient.post<LoginResponse>(
            routes.auth.login,
            {
              email: credentials?.email,
              password: credentials?.password,
            },
          );

          if (data?.access_token) {
            return data;
          }

          return null;
        } catch (error) {
          console.log('Login error:', error);
          return null;
        }
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
