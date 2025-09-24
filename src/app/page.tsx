'use client';

import { type FC, useState } from 'react';

import { BaseInput } from '@/ui/inputs/base-input/BaseInput';
import { ShowPasswordUnchecked } from '@/ui/inputs/base-input/assets';
import { Logo } from '@/ui/logo/Logo';

const Home: FC = () => {
  const [value, setValue] = useState<string | number>();

  return (
    <div className="container">
      <Logo />
      <BaseInput
        Icon={ShowPasswordUnchecked}
        onChange={(e) => {
          setValue(e.target.value);
        }}
        value={value}
        placeholder="Enter your password"
      />
      Welcome to the Home Page
    </div>
  );
};

export default Home;
