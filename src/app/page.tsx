'use client';

import { type FC, useState } from 'react';

import { PhoneInput } from '@/ui/inputs';
import { Logo } from '@/ui/logo/Logo';

const Home: FC = () => {
  const [value, setValue] = useState<string | number>();

  console.log(value);

  return (
    <div className="container">
      <Logo />
      <PhoneInput
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
      />
      Welcome to the Home Page
    </div>
  );
};

export default Home;
