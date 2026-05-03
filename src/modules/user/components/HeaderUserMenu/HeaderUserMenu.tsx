import Image from 'next/image';

import type { User } from '@/shared/types';

import styles from './styles/HeaderUserMenu.module.scss';

import { USER } from '../../constants/constants';

interface HeaderUserMenuProps {
  data?: User;
}

export const HeaderUserMenu = ({ data }: HeaderUserMenuProps) => {
  if (!data) return null;

  const hasAvatar =
    typeof data.avatar_url === 'string' && data.avatar_url.startsWith('http');
  return (
    <div className={styles.userRow}>
      <div className={styles.userIcon}>
        {hasAvatar ? (
          <Image
            src={data.avatar_url as string}
            alt="Аватар користувача"
            width={100}
            height={100}
            className={styles.avatarImage}
          />
        ) : (
          <div className={styles.avatarPlaceholder}>
            <USER.Icon />
          </div>
        )}
      </div>

      <div className={styles.userInfo}>
        <h1 className={styles.userName}>{data?.username || USER.name}</h1>
        <p className={styles.userEmail}>{data?.email || USER.email}</p>
      </div>
    </div>
  );
};
