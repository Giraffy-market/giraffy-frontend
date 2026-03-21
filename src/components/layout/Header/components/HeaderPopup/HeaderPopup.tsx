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
import {
  ADD,
  LOGOUT,
  SUPPORT,
  TRIGGER,
} from '@/modules/categories/constants/constants';
import { Nav } from '@/modules/user/components';
import { HeaderUserMenu } from '@/modules/user/components/';
import { useCurrentUser } from '@/modules/user/hooks/useCurrentUser';

import { Button } from '@/components/ui/button/Button';
import { Loader } from '@/components/ui/loader/Loader';
import { ToastMessage } from '@/components/ui/toastMessage/toastMessages';

import { handleApiError } from '@/shared/api/helpers/handleApiError';
import { routing } from '@/shared/routing';

import styles from './styles/HeaderPopup.module.scss';

import { panelVariants } from '../../constants/variants';

type Props = {
  popupClassName?: string;
};

export const HeaderPopup: FC<Props> = ({ popupClassName }) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const [, setModal] = useQueryState(MODAL_QUERY_STATE);
  const { user, isLoading, error } = useCurrentUser();

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

  if (error && !user) {
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
            {isLoggedIn && user ? (
              <>
                <HeaderUserMenu data={user} />

                <Link href={ADD.href} className={styles.addButton}>
                  {ADD.label}
                </Link>

                <nav className={styles.nav}>
                  <Nav onLinkClick={handleClose} />
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
