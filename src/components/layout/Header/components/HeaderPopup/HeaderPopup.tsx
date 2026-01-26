'use client';

import type { FC } from 'react';
import { useEffect, useRef, useState } from 'react';

import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useQueryState } from 'nuqs';

import {
  LOGIN_FORM_MODAL_KEY,
  MODAL_QUERY_STATE,
  REGISTER_FORM_MODAL_KEY,
} from '@/modules/auth';
import { useFetchUser } from '@/modules/user/api/useFetchUser';

import { Button } from '@/components/ui/button/Button';
import { Loader } from '@/components/ui/loader/Loader';
import { ToastMessage } from '@/components/ui/toastMessage/toastMessages';

import {
  ADD,
  LOGOUT,
  NAV,
  SUPPORT,
  TRIGGER,
  USER,
} from './constants/constants';
import { panelVariants } from './constants/variants';

import { handleApiError } from '@/shared/api/helpers/handleApiError';
import { routing } from '@/shared/routing';

import styles from './styles/HeaderPopup.module.scss';

type Props = {
  popupClassName?: string;
};

export const HeaderPopup: FC<Props> = ({ popupClassName }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [, setModal] = useQueryState(MODAL_QUERY_STATE);
  const { data, isLoading, error } = useFetchUser();

  const { status } = useSession();
  const isLoggedIn = status === 'authenticated';

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

  const handleClose = () => setOpen(false);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') setOpen(false);
  };

  if (isLoading) return <Loader />;

  if (error && !data) {
    const errorMessage = handleApiError(error);

    <ToastMessage type="error" message={errorMessage} />;
  }

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
            {isLoggedIn && data ? (
              <>
                <div className={styles.userRow}>
                  <div className={styles.userIcon}>
                    {data.avatar_url || <USER.Icon />}
                  </div>

                  <div className={styles.userInfo}>
                    <h1 className={styles.userName}>
                      {data.username || USER.name}
                    </h1>
                    <p className={styles.userEmail}>
                      {data.email || USER.email}
                    </p>
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

                <button
                  className={cn(styles.itemRow, styles.logoutBtn)}
                  onClick={() => signOut({ callbackUrl: routing.home.base })}
                >
                  <LOGOUT.Icon />
                  <span>{LOGOUT.label}</span>
                </button>
              </>
            ) : (
              <div className={styles.unAuthorizedWrapper}>
                <p className={styles.text}>
                  Увійдіть щоб користуватися всіма можливостями
                </p>
                <Button
                  variant="primary"
                  text="Увійти"
                  onClick={() => {
                    setModal(LOGIN_FORM_MODAL_KEY);
                    handleClose();
                  }}
                />
                <Button
                  variant="outline"
                  text="Реєстрація"
                  onClick={() => {
                    setModal(REGISTER_FORM_MODAL_KEY);
                    handleClose();
                  }}
                />
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
