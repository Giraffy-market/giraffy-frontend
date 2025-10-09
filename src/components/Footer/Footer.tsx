'use client';

import Link from 'next/link';

import { Logo } from '@/ui/logo/Logo';

import s from './Footer.module.scss';

const footerLinks = [
  { href: '/about', label: 'Про нас' },
  { href: '/contacts', label: 'Контакти' },
  { href: '/exchange-returns', label: 'Правила обміну/повернення' },
  { href: '/faq', label: 'FAQ' },
];
export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={s.footer} role="contentinfo">
      <div className={`container ${s['footer__inner']}`}>
        <div className={s['footer__top']}>
          <Logo />

          <nav className={s['footer__nav']} aria-label="Footer navigation">
            <ul className={s['footer__menu']}>
              {footerLinks.map((link) => (
                <li key={link.href} className={s['footer__menu-item']}>
                  <Link href={link.href} className={s['footer__menu-link']}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className={s['footer__copy']}>&copy; {year} — Giraffy.</p>

        <p className={s['footer__legal']}>
          Усі права захищено.
          <br className={s['footer__only-mobile']} />
          <Link href="/privacy" className={s['footer__legal-link']}>
            Політика конфіденційності
          </Link>
          &nbsp;та&nbsp;
          <Link href="/tos" className={s['footer__legal-link']}>
            Умови&nbsp;
            <br className={s['footer__only-mobile']} />
            надання послуг
          </Link>
          .
        </p>
      </div>
    </footer>
  );
};
