import {
  type Account,
  type AuthOptions,
  type Session,
  type User,
  getServerSession,
} from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import type { LoginResponse } from '@/modules/auth/type/types';

import { handleRefreshToken } from '../api/handleRefreshToken';

import { endpoints } from '@/shared/api/constants/endpoints';
import { handleApiError } from '@/shared/api/helpers/handleApiError';

import { customFetch } from '../../../shared/api/fetch';

interface BackendAccount extends Account {
  backend_access_token?: string;
  backend_user_id?: string;
}

interface CustomUser {
  id: string;
  access_token: string;
  refresh_token: string;
  user_id: string;
  expired_in: number;
}

export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        },
      },
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
        accessToken: { label: 'Access Token', type: 'text' },
        refreshToken: { label: 'Refresh Token', type: 'text' },
        userId: { label: 'User ID', type: 'text' },
      },
      // @ts-expect-error next-auth err
      authorize: async (credentials) => {
        if (credentials?.accessToken) {
          return {
            access_token: credentials.accessToken,
            refresh_token: credentials.refreshToken || '',
            user_id: credentials.userId || '',
            expired_in: 3600,
          };
        }
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
    async signIn({ account }) {
      if (account?.provider === 'google') {
        try {
          const tokenToVerify = account.id_token;

          if (!tokenToVerify) {
            console.error('NextAuth не отримав id_token від Google');
            return false;
          }

          const data = await customFetch<LoginResponse>(
            endpoints.auth_google.callback,
            tokenToVerify,
            { method: 'GET' },
          );

          if (data?.access_token) {
            (account as BackendAccount).backend_access_token =
              data.access_token;
            (account as BackendAccount).backend_user_id = data.user_id;
            return true;
          }

          console.error('Бекенд не повернув access_token');
          return false;
        } catch (error) {
          console.error('Помилка в signIn через customFetch:', error);
          return false;
        }
      }
      return true;
    },
    async jwt({
      token,
      user,
      account,
    }: {
      token: JWT;
      user?: User;
      account?: Account | null;
    }) {
      if (
        account?.provider === 'google' &&
        (account as BackendAccount).backend_access_token
      ) {
        return {
          ...token,
          access_token: (account as BackendAccount).backend_access_token,
          user_id: user?.id ?? token.sub,
          expiresAt: Math.floor(Date.now() / 1000) + 3600,
        };
      }
      if (user) {
        return {
          ...token,
          access_token: user.access_token,
          refresh_token: user.refresh_token,
          user_id: user.user_id,
          expiresAt: Math.floor(Date.now() / 1000) + user.expired_in,
        };
      }

      if (Math.floor(Date.now() / 1000) < (token.expiresAt ?? 0)) {
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
      session.user.id = token.user_id ?? session.user.id ?? '';
      session.error = token.error;

      return session;
    },
  },

  pages: {
    signIn: '/',
    error: '/auth/error',
  },
};

export const getServerAuthSession = (): Promise<Session | null> =>
  getServerSession(authOptions);
