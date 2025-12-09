import Image from 'next/image';

import defaultAvatar from '@/components/prifile/assets/defaultAvatar.png';
import StarEmpty from '@/components/prifile/assets/star-empty.svg';
import StarFilled from '@/components/prifile/assets/star-filled.svg';

import { reviewsData } from '../reviewsData';
import styles from './ReviewsList.module.scss';

export default function ReviewsList() {
  return (
    <div className={styles.reviewsWrapper}>
      <h3 className={styles.reviewsTitle}>Відгуки ({reviewsData.length})</h3>

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

      <button className={styles.allReviewsBtn} disabled>
        Дивитися всі відгуки &gt;
      </button>
    </div>
  );
}
