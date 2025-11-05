import NextAuth from 'next-auth';
import type { JWT } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    access_token: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    access_token: string;
    // refreshToken: string;
    // expiresIn: number;
  }
}
