'use client';

import { HeaderCategories } from '@/modules/header/header-categories';
import { SearchBar } from '@/modules/header/search-bar/SearchBar';

import { Logo } from '@/ui/logo/Logo';

import styles from './Header.module.scss';
import { HeaderAction } from './header-action/HeaderAction';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <Logo />
        <HeaderCategories />
      </div>

      <div className={styles.center}>
        <SearchBar />
      </div>

      <div className={styles.right}>
        <HeaderAction />
      </div>
    </header>
  );
};
