'use client';

import type { FC } from 'react';
import { useRef, useState } from 'react';

import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import Link from 'next/link';

import styles from './HeaderPopup.module.scss';
import { ADD, LOGOUT, NAV, SUPPORT, TRIGER, USER } from './constants';

type Props = {
  popupClassName?: string;
};

export const panelVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 120, damping: 20 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: { type: 'spring', stiffness: 120, damping: 20 },
  },
};

export const HeaderPopup: FC<Props> = ({ popupClassName }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const handleClose = () => setOpen(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') handleClose();
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      handleClose();
    }
  };

  return (
    <div
      ref={wrapperRef}
      className={cn(styles.container, popupClassName)}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onPointerDown={handlePointerDown}
    >
      <button
        className={styles.trigger}
        onClick={() => setOpen((s) => !s)}
        aria-expanded={open}
      >
        <div className={styles.triggerIcon}>
          <TRIGER.Icon />
        </div>
      </button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className={styles.backdrop}
              onClick={handleClose}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

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
                  <Link
                    key={item.id}
                    href={item.href}
                    className={styles.navItem}
                  >
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

              <button className={cn(styles.itemRow, styles.logoutBtn)}>
                <LOGOUT.Icon />
                <span>{LOGOUT.label}</span>
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HeaderPopup;
