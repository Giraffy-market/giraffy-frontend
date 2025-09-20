import type { FC } from 'react';

import { Logo } from '@/ui/logo/Logo';

const Home: FC = () => {
  return (
    <div className="container">
      <Logo />
      Welcome to the Home Page
    </div>
  );
};

export default Home;
