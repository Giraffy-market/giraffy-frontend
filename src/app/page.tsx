'use client';

import { type FC, useState } from 'react';

import { Categories } from '@/modules/categories';

import { PhoneInput } from '@/ui/inputs';
import { Logo } from '@/ui/logo/Logo';

const Home: FC = () => {
  const [value, setValue] = useState<string | number>();

  return (
    <>
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

      <section>
        <Categories />
      </section>
    </>
  );
};

export default Home;
