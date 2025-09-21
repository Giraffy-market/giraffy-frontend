import { type FC } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import LogoIcon from './assets/logo.svg';
import './styles/logo.scss';

export const Logo: FC = () => (
  <Link href="/" className="logo">
    <Image src={LogoIcon} alt="Girrafy logo" className="logo__image" />

    <span className="logo__text">Girrafy</span>
  </Link>
);
