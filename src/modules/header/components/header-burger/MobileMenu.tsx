import { USER } from '../constants/constants';

import styles from './MobileMenu.module.scss';

export const MobileMenu = () => {
  return (
    <div className={styles.overlay}>
      <div className={styles.userRow}>
        <div className={styles.userIcon}>
          <USER.Icon />
        </div>
        <div className={styles.userInfo}>
          <h1 className={styles.userInfo}>{USER.name}</h1>
          <div className={styles.leftGroup}>
            <p className={styles.userEmail}>{USER.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
