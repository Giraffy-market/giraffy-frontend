'use client';

import { type FC, useState } from 'react';
<<<<<<< HEAD
=======

import { useQueryState } from 'nuqs';
>>>>>>> 6fe278b (refactor(feature/OW2-301-auth): change login open/close logic from statu to nuqs, add nuqsAdapter, add label to baseInput and fix passwordInput button)

import { useQueryState } from 'nuqs';

import { LoginForm } from '@/modules/auth/components/LoginForm';
import { closeModal } from '@/modules/auth/components/LoginForm/shared/utils/closeModal';
import AuthFormModal from '@/modules/auth/ui/AuthFormModal/AuthFormModal';
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
  const [email, setEmail] = useQueryState('email');
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

        <AuthFormModal
          isOpen={modal === 'modal-login'}
          onClose={() => closeModal({ setModal, setEmail })}
        >
          <LoginForm />
        </AuthFormModal>

        <AuthFormModal
          isOpen={modal === 'modal-register'}
          onClose={() => closeModal({ setModal, setEmail })}
        >
          Register
        </AuthFormModal>
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
