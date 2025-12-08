'use client';

import { HeaderAction } from './components/header-action';
import { HeaderCategories } from './components/header-categories';
import { SearchBar } from './components/search-bar';

import { Logo } from '@/ui/logo/Logo';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerWrap}>
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
      </div>
    </header>
  );
};
