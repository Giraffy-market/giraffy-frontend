import { Nunito, Open_Sans } from 'next/font/google';

export const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin', 'cyrillic'],
  fallback: ['sans-serif'],
});

export const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin', 'cyrillic'],
  fallback: ['sans-serif'],
});
