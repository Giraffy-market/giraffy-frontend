import FavoritesIcon from '@/components/header/assets/favourites.svg';
import NotificationIcon from '@/components/header/assets/notification.svg';

import { HeaderPopup } from '../header-popup';
import styles from './HeaderAction.module.scss';

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
