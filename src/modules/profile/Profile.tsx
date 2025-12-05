'use client';

import Image from 'next/image';

import defaultAvatar from '@/components/prifile/assets/defaultAvatar.png';
import PencilIcon from '@/components/prifile/assets/pencil.svg';
import StarEmpty from '@/components/prifile/assets/star-empty.svg';
import StarFilled from '@/components/prifile/assets/star-filled.svg';

import { Loader } from '@/ui/loader/Loader';
import { ToastMessage } from '@/ui/toastMessage/toastMessages';

import { useFetchUser } from './api/profile';

import { handleApiError } from '@/shared/api/helpers/handleApiError';

import styles from './Profile.module.scss';
import { formatDateToUk } from './formatDateToUk';
import { reviewsData } from './reviewsData';

export default function UserProfilePage() {
  const { data: user, isLoading, error } = useFetchUser();

  if (isLoading) return <Loader />;

  if (error || !user) {
    const errorMessage = handleApiError(error);

    return <ToastMessage type="error" message={errorMessage} />;
  }

  return (
    <div className="container">
      <div className={styles.profileWrapper}>
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
              {user.datetime_create
                ? formatDateToUk(user.datetime_create)
                : '--'}
            </p>
          </div>
        </div>

        <div className={styles.profileDetails}>
          <div className={styles.descriptionsWrapper}>
            <div className={styles.titleWrapper}>
              <h3 className={styles.title}>Дані профілю</h3>
              <button className={styles.editButton} disabled>
                Редагувати
                <PencilIcon className={styles.pencileIcon} />
              </button>
            </div>

            <div className={styles.top}>
              <p>{user.email ?? 'Немає email'}</p>
              <p>{user.phone_number ?? 'Немає телефону'}</p>
            </div>

            <div className={styles.bottom}>
              <p>Активних оголошень: {user.announcements?.length ?? 0}</p>
              <p>Завершених угод: {user.completed_deals ?? 0}</p>
              <p>Середня оцінка: 4.8 </p>
              <p>Дата реєстрації: {user.datetime_create ?? '--'}</p>
            </div>
          </div>

          <div className={styles.reviewsWrapper}>
            <h3 className={styles.reviewsTitle}>
              Відгуки ({reviewsData.length})
            </h3>

            <div className={styles.reviewsList}>
              {reviewsData.map((review) => (
                <div key={review.id} className={styles.reviewCard}>
                  <div className={styles.reviewHeader}>
                    <Image
                      src={review.user.avatar || defaultAvatar}
                      alt={review.user.name}
                      width={40}
                      height={40}
                      className={styles.reviewAvatar}
                    />
                    <p className={styles.reviewName}>{review.user.name}</p>
                  </div>

                  <div className={styles.stars}>
                    {Array.from({ length: 5 }).map((_, index) =>
                      index < review.rating ? (
                        <StarFilled key={index} className={styles.starIcon} />
                      ) : (
                        <StarEmpty key={index} className={styles.starIcon} />
                      ),
                    )}
                  </div>

                  <p className={styles.reviewText}>{review.text}</p>
                </div>
              ))}
            </div>

            <button className={styles.allReviewsBtn}>
              Дивитися всі відгуки &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
