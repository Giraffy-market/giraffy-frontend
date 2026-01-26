import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const url = req.nextUrl.clone();
    const token = req.nextauth.token;

    // Если нет токена, редирект на главную с открытием модалки логина
    if (!token) {
      // Ключи тут как magic strings, потому что тут нельзя использовать из других модулей
      url.pathname = '/';
      url.searchParams.set('modal', 'modal-login');

      return NextResponse.redirect(url);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      // Мы сами смотрим авторизован пользователь или нет
      authorized: () => true,
    },
  },
);

export const config = {
  // matcher: ['/test'],
  matcher: [],
};
