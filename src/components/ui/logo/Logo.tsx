import { type FC } from 'react';

import Link from 'next/link';

import LargeLogo from './assets/largeLogo.svg';
import SmallLogo from './assets/smallLogo.svg';

import './styles/logo.scss';

type Props = {
  size?: 'small' | 'large';
};

export const Logo: FC<Props> = () => {
  return (
    <Link href="/" className="logo">
      <div className="logo__icon--small">
        <SmallLogo role="img" aria-label="Girrafy logo" aria-hidden="true" />
      </div>

      <div className="logo__icon--large">
        <LargeLogo role="img" aria-label="Girrafy logo" />
      </div>

      <span className="logo__text">Girrafy</span>
    </Link>
  );
};
