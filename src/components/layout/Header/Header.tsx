'use client';

import { HeaderAction } from './components/HeaderAction/HeaderAction';
import { HeaderCategories } from './components/HeaderCategories';
import { SearchBar } from './components/SearchBar';
import { Logo } from '@/components/ui/logo/Logo';

import styles from './styles/Header.module.scss';

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
