'use client';

import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import Link from 'next/link';

import {
  ADD,
  LOGOUT,
  NAV,
  SUPPORT,
  TRIGGER,
  USER,
} from './constants/constants';
import { panelVariants } from './constants/variants';

import styles from './styles/HeaderPopup.module.scss';

type Props = {
  popupClassName?: string;
};

export const HeaderPopup: FC<Props> = ({ popupClassName }) => {
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

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') setOpen(false);
  };

  return (
    <div
      ref={wrapperRef}
      className={cn(styles.container, popupClassName)}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
    >
      <button
        className={styles.trigger}
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
      >
        <TRIGGER.Icon />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.popupWrap}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={panelVariants}
          >
            <div className={styles.userRow}>
              <div className={styles.userIcon}>
                <USER.Icon />
              </div>

              <div className={styles.userInfo}>
                <h1 className={styles.userName}>{USER.name}</h1>
                <p className={styles.userEmail}>{USER.email}</p>
              </div>
            </div>

            <Link href={ADD.href} className={styles.addButton}>
              {ADD.label}
            </Link>

            <nav className={styles.nav}>
              {NAV.map((item) => (
                <Link key={item.id} href={item.href} className={styles.navItem}>
                  <item.Icon />
                  <span>{item.label}</span>
                </Link>
              ))}
            </nav>

            <Link
              href={SUPPORT.href}
              className={cn(styles.itemRow, styles.supportLink)}
            >
              <SUPPORT.Icon />
              <span>{SUPPORT.label}</span>
            </Link>

            {/* TODO: додати логіку logout, прибрати disabled та style={...} */}
            <button
              className={cn(styles.itemRow, styles.logoutBtn)}
              disabled
              style={{
                opacity: 0.5,
                cursor: 'not-allowed',
                pointerEvents: 'none',
              }}
            >
              <LOGOUT.Icon />
              <span>{LOGOUT.label}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
