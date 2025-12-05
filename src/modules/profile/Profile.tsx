'use client';

import Image from 'next/image';

import ProfileIcon from '@/components/header/assets/profile.svg';

import { Loader } from '@/ui/loader/Loader';
import { ToastMessage } from '@/ui/toastMessage/toastMessages';

import { useFetchUser } from './api/profile';

import { handleApiError } from '@/shared/api/helpers/handleApiError';

import styles from './Profile.module.scss';
import { formatDateToUk } from './formatDateToUk';

export default function UserProfilePage() {
  const { data: user, isLoading, error } = useFetchUser();

  if (isLoading) return <Loader />;

  if (error || !user) {
    const errorMessage = handleApiError(error);

    return <ToastMessage type="error" message={errorMessage} />;
  }

  return (
    <div className="container">
      <div className={styles.profilWrapper}>
        <div className={styles.userData}>
          <div className={styles.avatar}>
            {user.avatar_url ? (
              <Image
                src={user.avatar_url}
                alt="Аватар користувача"
                width={100}
                height={100}
                className={styles.avatarImage}
              />
            ) : (
              <div className={styles.defaultAvatar}>
                <ProfileIcon className={styles.icon} />
              </div>
            )}
          </div>

          <div className={styles.bio}>
            <div className={styles.username}>
              <p>{user.first_name ?? 'Іван'}</p>
              <p>{user.last_name ?? 'Коваленко'}</p>
            </div>
            <p>Львів, Україна</p>
            <p>
              На Giraffy з{' '}
              {user.datetime_create
                ? formatDateToUk(user.datetime_create)
                : '-'}
            </p>
          </div>
        </div>

        <div className={styles.descriptionsWrapper}>
          <div className={styles.titleWrapper}>
            <h3 className={styles.title}>Дані профілю</h3>
            <button className={styles.editButton} disabled>
              Редагувати
            </button>
          </div>

          <div className={styles.top}>
            <p className={styles.descriptions}>
              Продаю техніку та аксесуари. Люблю порядок у речах і чесні угоди.
              Відповідаю швидко.
            </p>
            <p>{user.email}</p>
            <p>{user.phone_number}</p>
          </div>

          <div className={styles.bottom}>
            <p>Активних оголошень: 5</p>
            <p>Завершених угод: 12</p>
            <p>Середня оцінка: 4.8 </p>
            <p>Дата реєстрації: {user?.datetime_create}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
