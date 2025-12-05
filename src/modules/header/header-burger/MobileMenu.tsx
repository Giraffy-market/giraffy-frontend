import { useState } from 'react';

import Link from 'next/link';

import DropdownCategoriesIcon from '@/components/header/assets/Expand_right_light.svg';
import CategoriesLogo from '@/components/header/assets/categories.svg';

import { FAVOURITES, NAV, NOTIFICATIONS } from '../constants/constants';

import styles from './styles/MobileMenu.module.scss';

import { MobileCategories } from './MobileCategories';

export const MobileMenu = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [user, setUser] = useState(false);

  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  return (
    <div className={`${styles.overlay} ${isOpen ? styles.open : ''}`}>
      <button
        onClick={() => {
          !isOpen;
        }}
      ></button>
      <div className={styles.guestRow}>
        <div className={styles.guestWrapper}>
          <p className={styles.loginMessage}>
            Увійдіть щоб користуватися всіма можливостями
          </p>
          <button
            className={styles.loginButton}
            type="button"
            onClick={() => {
              setUser(true);
            }}
          >
            Увійти
          </button>
        </div>
      </div>

      {/* <nav className={styles.nav}>
        {NAV.map((item) => (
          <Link key={item.id} href={item.href} className={styles.navItem}>
            <item.Icon />
            <span>{item.label}</span>
          </Link>
        ))}
      </nav> */}
      <div className={styles.list}>
        <button
          className={styles.categoriesButton}
          onClick={() => setIsCategoriesOpen(true)}
        >
          <span className={styles.leftGroup}>
            <CategoriesLogo />
            <span>Категорії</span>
          </span>
          <div className={styles.rightGroup}>
            <DropdownCategoriesIcon className={styles.dropdownButton} />
          </div>
        </button>
        <MobileCategories
          isOpen={isCategoriesOpen}
          onClose={() => {
            setIsCategoriesOpen(false);
          }}
        />
        <div className={styles.notifications}>
          <Link href={NOTIFICATIONS.href} className={styles.itemRow}>
            <NOTIFICATIONS.Icon />
            <span>{NOTIFICATIONS.label}</span>
          </Link>
        </div>
        <div className={styles.favourites}>
          <Link href={FAVOURITES.href} className={styles.itemRow}>
            <FAVOURITES.Icon />
            <span>{FAVOURITES.label}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
