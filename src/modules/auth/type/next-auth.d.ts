import NextAuth from 'next-auth';
import { JWT } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      appRole: 'admin' | 'manager' | 'user';
      name: string;
      email: string;
      createdAt: Date;
      updatedAt: Date;
    };
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: {
      id: string;
      appRole: 'admin' | 'manager' | 'user';
      name: string;
      email: string;
      createdAt: Date;
      updatedAt: Date;
    };
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }
}
