import type { FC } from 'react';

import { Input } from '@/ui/inputs/password-input/Input';
import { Logo } from '@/ui/logo/Logo';

const Home: FC = () => {
  return (
    <div className="container">
      <Logo />
      <Input />
      Welcome to the Home Page
    </div>
  );
};

export default Home;
