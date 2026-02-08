/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth';
import type { JWT } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    };
    access_token: string;
    refresh_token: string;
    expires: number;
    error?: string;
  }

  interface User {
    user_id: string;
    access_token: string;
    refresh_token: string;
    expired_in: number;
    email: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user_id: string;
    access_token: string;
    refresh_token: string;
    token_type: string;
    expired_in: number;
    expiresAt: number; // Нам это нужно для логики рефреша
    token_type?: string; // Ставим ?, если бэк не всегда его шлет
    error?: string;
  }
}
