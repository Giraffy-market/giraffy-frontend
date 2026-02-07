import { type AuthOptions, type Session, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import type { LoginResponse } from '@/modules/auth/type/types';

import { handleRefreshToken } from '../api/handleRefreshToken';

import { endpoints } from '@/shared/api/constants/endpoints';
import { handleApiError } from '@/shared/api/helpers/handleApiError';

import { customFetch } from '../../../shared/api/fetch';

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
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
        try {
          const data = await customFetch<LoginResponse>(
            endpoints.auth.login,
            '',
            {
              method: 'POST',
              body: JSON.stringify({
                email: credentials!.email,
                password: credentials!.password,
              }),
            },
          );

          if (data?.access_token) {
            return data;
          }

          return data;
        } catch (error) {
          const message = handleApiError(error);

          const errorMessage = Array.isArray(message)
            ? message.join(', ')
            : message;

          throw new Error(errorMessage);
        }
      },
    }),
  ],

  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        return {
          ...token,
          access_token: user.access_token,
          refresh_token: user.refresh_token,
          user_id: user.user_id,
          expired_in: user.expired_in,
          expiresAt: Math.floor(Date.now() / 1000) + user.expired_in,
        };
      }

      if (Math.floor(Date.now() / 1000) < token.expiresAt) {
        return token;
      }

      try {
        console.log('Token expired, refreshing...');
        const refreshedToken = await handleRefreshToken(token);
        return refreshedToken;
      } catch (error) {
        console.error('Refresh error', error);

        return { ...token, error: 'RefreshAccessTokenError' };
      }
    },

    session: async ({ session, token }) => {
      session.access_token = token.access_token;
      session.refresh_token = token.refresh_token;
      session.user.id = token.user_id;
      session.error = token.error;

      return session;
    },
  },

  // pages: {
  //   signIn: 'modal-login',
  // },
};

export const getServerAuthSession = (): Promise<Session | null> =>
  getServerSession(authOptions);
