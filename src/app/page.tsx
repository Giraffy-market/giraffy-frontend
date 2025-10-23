'use client';

import { type FC, useState } from 'react';

import { Categories } from '@/modules/categories';

import logoOutIcon from '../components/profilePopup/assets/logout.svg';
import { Slider } from '@/components/slider/Slider';

import { Popup } from '@/ui/Popup/Popup';
import { BaseInput, PasswordInput, PhoneInput } from '@/ui/inputs';
import { Logo } from '@/ui/logo/Logo';

const Home: FC = () => {
  const [value, setValue] = useState({
    base: '',
    password: '',
    phoneNumber: '',
  });

  const [open, setOpen] = useState(false);

  console.log('base: ', value.base);
  console.log('password: ', value.password);
  console.log('phoneNumber: ', value.phoneNumber);

  return (
    <>
      <div className="container">
        <Logo />
        <BaseInput
          value={value.base}
          onChange={(e) => setValue({ ...value, base: e.target.value })}
          Icon={logoOutIcon}
          iconPosition="right"
        />
        <PasswordInput
          value={value.password}
          onChange={(e) => setValue({ ...value, password: e.target.value })}
          Icon={logoOutIcon}
          iconPosition="left"
        />
        <PhoneInput
          value={value.phoneNumber}
          onChange={(e) => setValue({ ...value, phoneNumber: e.target.value })}
        />
        <button
          onClick={() => setOpen(true)}
          style={{ padding: '8px 16px', borderRadius: 8, cursor: 'pointer' }}
        >
          Open Pop up
        </button>
        <Popup isOpen={open} onClose={() => setOpen(false)}>
          <p>Content modal </p>
        </Popup>
      </div>

      <section>
        <Categories />
      </section>

      <Slider />
    </>
  );
};

export default Home;
