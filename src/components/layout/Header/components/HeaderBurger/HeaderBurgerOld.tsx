import { useState } from 'react';

import BurgerIcon from '@/components/header/assets/Menu.svg';

import { MobileMenu } from './MobileMenu';

// import styles from './styles/HeaderBurger.module.scss';

export const HeaderBurger = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        aria-label="Burger Menu"
        onClick={() => setIsOpen(true)}
      >
        <BurgerIcon />
      </button>

      {/* <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} /> */}
    </>
  );
};
