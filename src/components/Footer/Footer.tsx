import Link from 'next/link';

import { Logo } from '@/ui/logo/Logo';

import './Footer.scss';

const FOOTER_LINKS = [
  { id: 1, href: '/about', text: 'Про нас' },
  { id: 2, href: '/contacts', text: 'Контакти' },
  { id: 3, href: '/exchange-returns', text: 'Правила обміну/повернення' },
  { id: 4, href: '/faq', text: 'FAQ' },
];
export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <div className="footer__top">
          <Logo />

          <nav className="footer__nav" aria-label="Footer navigation">
            <ul className="footer__menu">
              {FOOTER_LINKS.map(({ id, text, href }) => (
                <li className="footer__menu-item" key={id}>
                  <Link className="footer__menu-link" href={href}>
                    {text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="footer__copy">&copy; {year} — Giraffy.</p>

        <p className="footer__legal">
          Усі права захищено.&nbsp;
          <br className="footer__legal-break" />
          <Link className="footer__legal-link" href="/privacy">
            Політика конфіденційності
          </Link>
          &nbsp;та&nbsp;
          <Link className="footer__legal-link" href="/tos">
            Умови надання послуг
          </Link>
          .
        </p>
      </div>
    </footer>
  );
};
