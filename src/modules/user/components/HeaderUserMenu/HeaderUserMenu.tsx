import type { User } from '@/shared/types';

import styles from './styles/HeaderUserMenu.module.scss';

import { USER } from '../../constants/constants';

interface HeaderUserMenuProps {
  data: User;
}

export const HeaderUserMenu = ({ data }: HeaderUserMenuProps) => {
  return (
    <div className={styles.userRow}>
      <div className={styles.userIcon}>{data.avatar_url || <USER.Icon />}</div>

      <div className={styles.userInfo}>
        <h1 className={styles.userName}>{data.username || USER.name}</h1>
        <p className={styles.userEmail}>{data.email || USER.email}</p>
      </div>
    </div>
  );
};
