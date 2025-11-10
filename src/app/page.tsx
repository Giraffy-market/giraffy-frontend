'use client';

import { type FC, useState } from 'react';

import { useQueryState } from 'nuqs';

import { LoginForm } from '@/modules/LoginForm';
import { Categories } from '@/modules/categories';

import logoOutIcon from '../components/profilePopup/assets/logout.svg';
import { Slider } from '@/components/slider/Slider';

import { Popup } from '@/ui/Popup/Popup';
import { CheckBox } from '@/ui/checkbox/CheckBox';
import { BaseInput, PasswordInput, PhoneInput } from '@/ui/inputs';
import { Logo } from '@/ui/logo/Logo';

const Home: FC = () => {
  const [value, setValue] = useState({
    base: '',
    password: '',
    phoneNumber: '',
  });

  const [open, setOpen] = useState(false);
  const [modal, setModal] = useQueryState('modal');

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

        <button
          onClick={() => setModal('modal-login')}
          style={{ padding: '8px 16px', borderRadius: 8, cursor: 'pointer' }}
        >
          Open Login Modal
        </button>

        <Popup isOpen={modal === 'modal-login'} onClose={() => setModal(null)}>
          <LoginForm />
        </Popup>

        <Popup
          isOpen={modal === 'modal-register'}
          onClose={() => setModal(null)}
        >
          Register
        </Popup>
      </div>

      <section>
        <Categories />
      </section>

      <Slider />

      <div>
        <CheckBox labelText="CheckBox" />
      </div>
    </>
  );
};

export default Home;
