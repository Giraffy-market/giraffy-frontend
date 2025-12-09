import Image from 'next/image';

import defaultAvatar from '@/components/prifile/assets/defaultAvatar.png';

import type { User } from '../types/user';

import { formatDateToUk } from '../formatDateToUk';
import styles from './UserData.module.scss';

type UserDataProps = {
  user: User;
};

export default function UserData({ user }: UserDataProps) {
  return (
    <div className={styles.userData}>
      <div className={styles.avatar}>
        <Image
          src={user.avatar_url || defaultAvatar}
          alt="Аватар користувача"
          width={100}
          height={100}
          className={styles.avatarImage}
        />
      </div>

      <div className={styles.bio}>
        <div className={styles.username}>
          <p>{user.first_name ?? 'Іван'}</p>
          <p>{user.last_name ?? 'Коваленко'}</p>
        </div>
        <p>{user.location ?? 'Львів, Україна'}</p>
        <p>
          На Giraffy з{' '}
          {user.datetime_create ? formatDateToUk(user.datetime_create) : '--'}
        </p>
      </div>
    </div>
  );
}
