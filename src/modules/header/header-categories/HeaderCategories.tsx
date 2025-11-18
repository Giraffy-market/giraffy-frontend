'use client';

import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import cn from 'classnames';
import { AnimatePresence } from 'framer-motion';

import CategoriesLogo from '@/components/header/assets/categories.svg';

import { HeaderCategoriesPopup } from './ui/HeaderCategoriesPopup/HeaderCategoriesPopup';

import styles from './HeaderCategories.module.scss';

export const HeaderCategories: FC = () => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={cn(styles.wrapper)}>
      <button className={styles.button} onClick={() => setOpen((s) => !s)}>
        <CategoriesLogo />
        <p>Категорії</p>
      </button>

      <AnimatePresence>{open && <HeaderCategoriesPopup />}</AnimatePresence>
    </div>
  );
};
