import cn from 'classnames';
import { useSession } from 'next-auth/react';
import Image from 'next/image';

import { Button } from '@/components/ui/button/Button';

import type { User } from '@/shared/types';

import styles from './styles/UserData.module.scss';

import defaultAvatar from '../../assets/defaultAvatar.png';
import { formatDateToUk } from '../../constants/formatDateToUk';

interface UserDataProps {
  user: User;
}

export function UserData({ user }: UserDataProps) {
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
            <p
              className={cn({
                [styles['placeholder'] as string]: !user.first_name,
              })}
            >
              {user.first_name ?? 'Ваше Імʼя'}
            </p>
            <p
              className={cn({
                [styles['placeholder'] as string]: !user.last_name,
              })}
            >
              {user.last_name ?? 'Ваше Прізвище'}
            </p>
          </div>
          <p
            className={cn({
              [styles['placeholder'] as string]: !user.location,
            })}
          >
            {user.location ?? 'Ваша Адреса'}
          </p>
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
