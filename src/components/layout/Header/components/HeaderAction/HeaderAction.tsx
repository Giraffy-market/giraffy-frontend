'use client';

import FavoritesIcon from '@/components/layout/Header/assets/favourites.svg';
import NotificationIcon from '@/components/layout/Header/assets/notification.svg';

import styles from './styles/HeaderAction.module.scss';

import { HeaderPopup } from '../HeaderPopup';

export const HeaderAction = () => {
  return (
    <div className={styles.action}>
      <button className={styles.notifications} type="button">
        <NotificationIcon />
      </button>

      <button className={styles.favorites} type="button">
        <FavoritesIcon />
      </button>

      <HeaderPopup />
    </div>
  );
};
