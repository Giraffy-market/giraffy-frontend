import { useSession } from 'next-auth/react';
import Image from 'next/image';

import { Button } from '@/components/ui/button/Button';

import type { User } from '@/shared/types';

import defaultAvatar from '../assets/defaultAvatar.png';

import { formatDateToUk } from '../formatDateToUk';
import styles from './UserData.module.scss';

interface UserDataProps {
  user: User;
}

export default function UserData({ user }: UserDataProps) {
  const { data: session } = useSession();
  const isOwnProfile = session?.user?.id === user.id;

  return (
    <div className={styles.userData}>
      <div className={styles.userDataWrapper}>
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

      {!isOwnProfile && (
        <div className={styles.actions}>
          <Button text="Написати продавцю" variant="primary" />
          <Button text="Всі оголошення" variant="outline" />
        </div>
      )}
    </div>
  );
}
