import Image from 'next/image';

import type { ReviewsListProps } from '@/shared/types';

import Add from '../assets/add.svg';
import DefaultAvatar from '../assets/defaultAvatar.png';
import StarEmpty from '../assets/star-empty.svg';
import StarFilled from '../assets/star-filled.svg';

import { reviewsData } from '../reviewsData';
import styles from './ReviewsList.module.scss';

export default function ReviewsList({
  // userId,
  isOwnProfile,
}: ReviewsListProps) {
  return (
    <div className={styles.reviewsWrapper}>
      <div className={styles.reviewsTitleWrapper}>
        <h3 className={styles.reviewsTitle}>Відгуки ({reviewsData.length})</h3>
        {!isOwnProfile && (
          <button className={styles.addReviewBtn} disabled>
            Додати відгук
            <Add />
          </button>
        )}
      </div>

      <div className={styles.reviewsList}>
        {reviewsData.map((review) => (
          <div key={review.id} className={styles.reviewCard}>
            <div className={styles.reviewHeader}>
              <Image
                src={review.user.avatar || DefaultAvatar}
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

      <button className={styles.allReviewsBtn} disabled>
        Дивитися всі відгуки &gt;
      </button>
    </div>
  );
}
