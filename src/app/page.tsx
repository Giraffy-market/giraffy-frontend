'use client';

import { type FC, useState } from 'react';

import { CategoriesList } from '@/modules/categories';

import { PhoneInput } from '@/ui/inputs';
import { Logo } from '@/ui/logo/Logo';
import SectionTitle from '@/ui/sectionTitle/SectionTitle';

const Home: FC = () => {
  const [value, setValue] = useState<string | number>();

  console.log(value);

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
        <div className="container">
          <SectionTitle title="Тебе зацікавлять" />
          <CategoriesList />
        </div>
      </section>
    </>
  );
};

export default Home;
