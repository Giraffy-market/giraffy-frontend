'use client';

import { HeaderCategories } from '@/modules/header/header-categories';
import { SearchBar } from '@/modules/header/search-bar/SearchBar';

import { Logo } from '@/ui/logo/Logo';

import styles from './Header.module.scss';
import { HeaderAction } from './header-action/HeaderAction';
import { HeaderBurger } from './header-burger/HeaderBurger';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerWrap}>
        <div className={styles.left}>
          <div className={styles.burger}>
            <HeaderBurger />
          </div>
          <div className={styles.logo}>
            <Logo />
          </div>
          <div className={styles.categories}>
            <HeaderCategories />
          </div>
        </div>

        <div className={styles.center}>
          <SearchBar />
        </div>

        <div className={styles.right}>
          <HeaderAction />
        </div>
      </div>
    </header>
  );
};
