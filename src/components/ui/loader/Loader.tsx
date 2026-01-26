import { type FC } from 'react';

import IconLoader from './assets/loader.svg';

import './styles/Loader.scss';

export const Loader: FC = () => {
  return (
    <div className="loader-overlay">
      <div className="loader-overlay__dot">
        <IconLoader role="img" aria-label="loading" />
      </div>
    </div>
  );
};
