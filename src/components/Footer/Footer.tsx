'use client';

import Link from 'next/link';

import { Logo } from '@/ui/logo/Logo';

import s from './footer.module.scss';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className={s.footer} role="contentinfo">
      <div className={s.inner}>
        <div className={s.top}>
          <div className={s.brandWrap}>
            <Logo />
          </div>

          <nav className={s.nav} aria-label="Footer navigation">
            <ul className={s.menu}>
              <li>
                <Link href="/about">Про нас</Link>
              </li>
              <li>
                <Link href="/contacts">Контакти</Link>
              </li>
              <li>
                <Link href="/exchange-returns">Правила обміну/повернення</Link>
              </li>
              <li>
                <Link href="/faq">FAQ</Link>
              </li>
            </ul>
          </nav>
        </div>

        <p className={s.copy}>© {year} — Giraffy.</p>

        <p className={s.legal}>
          Усі права захищено.
          <br className={s.onlyMobile} />
          <Link href="/privacy">Політика конфіденційності</Link>
          &nbsp;та&nbsp;
          <Link href="/tos" className={s.tos}>
            Умови
            <br className={s.onlyMobile} />
            надання послуг
          </Link>
          .
        </p>
      </div>
    </footer>
  );
}
