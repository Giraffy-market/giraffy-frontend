'use client';

import type { FC } from 'react';

import cn from 'classnames';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';
import { useQueryState } from 'nuqs';

import {
  LOGIN_FORM_MODAL_KEY,
  MODAL_QUERY_STATE,
  REGISTER_FORM_MODAL_KEY,
} from '@/modules/auth';

import { Button } from '@/ui/button/Button';
import { DrawerClose } from '@/ui/drawer';
import { Loader } from '@/ui/loader/Loader';
import { ToastMessage } from '@/ui/toastMessage/toastMessages';

import { ADD, LOGOUT, NAV, SUPPORT, USER } from '../constants/constants';

import { handleApiError } from '@/shared/api/helpers/handleApiError';
import { routing } from '@/shared/routing';

import { useFetchUser } from '../../api/useFetchUser';
import styles from './MobileMenu.module.scss';

export const MobileMenu: FC = () => {
  const [, setModal] = useQueryState(MODAL_QUERY_STATE);

  const { data, isLoading, error } = useFetchUser();
  const { status } = useSession();
  const isLoggedIn = status === 'authenticated';

  if (isLoading) return <Loader />;

  if (error && !data) {
    const errorMessage = handleApiError(error);
    return <ToastMessage type="error" message={errorMessage} />;
  }

  return (
    <div className={styles.container}>
      {isLoggedIn && data ? (
        <>
          <div className={styles.userRow}>
            <div className={styles.userIcon}>
              {data.avatar_url || <USER.Icon />}
            </div>

            <div className={styles.userInfo}>
              <h1 className={styles.userName}>{data.username || USER.name}</h1>
              <p className={styles.userEmail}>{data.email || USER.email}</p>
            </div>
          </div>

          <DrawerClose asChild>
            <Link href={ADD.href} className={styles.addButton}>
              {ADD.label}
            </Link>
          </DrawerClose>

          <nav className={styles.nav}>
            {NAV.map((item) => (
              <DrawerClose asChild key={item.id}>
                <Link href={item.href} className={styles.navItem}>
                  <item.Icon />
                  <span>{item.label}</span>
                </Link>
              </DrawerClose>
            ))}
          </nav>

          <DrawerClose asChild>
            <Link
              href={SUPPORT.href}
              className={cn(styles.itemRow, styles.supportLink)}
            >
              <SUPPORT.Icon />
              <span>{SUPPORT.label}</span>
            </Link>
          </DrawerClose>

          <DrawerClose asChild>
            <button
              className={cn(styles.itemRow, styles.logoutBtn)}
              onClick={() => signOut({ callbackUrl: routing.home.base })}
            >
              <LOGOUT.Icon />
              <span>{LOGOUT.label}</span>
            </button>
          </DrawerClose>
        </>
      ) : (
        <div className={styles.unAuthorizedWrapper}>
          <p className={styles.text}>
            Увійдіть щоб користуватися всіма можливостями
          </p>

          <DrawerClose asChild>
            <Button
              variant="primary"
              text="Увійти"
              onClick={() => setModal(LOGIN_FORM_MODAL_KEY)}
            />
          </DrawerClose>

          {/* <DrawerClose asChild>
            <Button
              variant="outline"
              text="Реєстрація"
              onClick={() => setModal(REGISTER_FORM_MODAL_KEY)}
            />
          </DrawerClose> */}
        </div>
      )}
    </div>
  );
};
