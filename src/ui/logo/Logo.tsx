import { type FC } from 'react';

import Link from 'next/link';

import LogoIcon from './assets/logo.svg';

import './styles/logo.scss';

export const Logo: FC = () => (
  <Link href="/" className="logo">
    <LogoIcon role="img" aria-label="Girrafy logo" />

    <span className="logo__text">Girrafy</span>
  </Link>
);
