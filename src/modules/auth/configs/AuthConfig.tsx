import { type AuthOptions, type Session, getServerSession } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

import type { LoginResponse } from '@/modules/auth/type/types';

import { refreshToken } from '../api/refreshToken';

import { routes } from '@/shared/api/constants/routes';
import { HttpError } from '@/shared/api/errors/http-error';
import { handleApiError } from '@/shared/api/helpers/handleApiError';

import { customFetch } from '../../../shared/api/fetch';

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
        try {
          const data = await customFetch<LoginResponse>(routes.auth.login, '', {
            method: 'POST',
            body: JSON.stringify({
              email: credentials!.email,
              password: credentials!.password,
            }),
          });

          if (data?.access_token) {
            return data;
          }
        } catch (error) {
          const message = handleApiError(error);

          throw new HttpError(401, { detail: message });
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
        const u = user as unknown as LoginResponse;
        return {
          ...token,
          ...u,
          expired_in: Math.floor(Date.now() / 1000) + u.expired_in,
        };
      }

      if (new Date().getTime() < token.expired_in * 1000) return token;

      return await refreshToken(token);
    },

    session: async ({ session, token }) => {
      if (token) {
        session.user.id = token.user_id;
        session.access_token = token.access_token;
        session.refresh_token = token.refresh_token;
        session.expires = new Date(token.expired_in * 1000).toISOString();
      }

      return session;
    },
  },

  pages: {
    signIn: 'modal-login',
  },
};

export const getServerAuthSession = (): Promise<Session | null> =>
  getServerSession(authOptions);
