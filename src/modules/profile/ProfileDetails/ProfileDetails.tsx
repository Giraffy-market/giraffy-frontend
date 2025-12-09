import cn from 'classnames';

import ComplaintIcon from '@/components/prifile/assets/complaint.svg';
import LogoutIcon from '@/components/prifile/assets/logout.svg';
import PencilIcon from '@/components/prifile/assets/pencil.svg';

import type { ProfileDetailsProps, User } from '../types/user';

import ReviewsList from '../ReviewsList/ReviewsList';
import styles from './ProfileDetails.module.scss';

export default function ProfileDetails({
  user,
  onLogout,
  isOwnProfile,
}: ProfileDetailsProps) {
  return (
    <div className={styles.profileDetails}>
      <div className={styles.descriptionsWrapper}>
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>Дані профілю</h3>
          {isOwnProfile ? (
            <button
              className={cn(styles.detailActionBtn, styles.editButton)}
              disabled
            >
              Редагувати
              <PencilIcon />
            </button>
          ) : (
            <button className={cn(styles.detailActionBtn, styles.reportButton)}>
              Поскаржитися
              <ComplaintIcon />
            </button>
          )}
        </div>

        <div className={styles.top}>
          <p>{user.email ?? 'Немає email'}</p>
          <p>{user.phone_number ?? 'Немає телефону'}</p>
        </div>

        <div className={styles.bottom}>
          <p>Активних оголошень: {user.announcements?.length ?? 0}</p>
          <p>Завершених угод: {user.completed_deals ?? 0}</p>
          <p>Середня оцінка: 4.8</p>
          <p>Дата реєстрації: {user.datetime_create ?? '--'}</p>
        </div>
      </div>

      <ReviewsList userId={user.id} isOwnProfile={isOwnProfile} />

      {isOwnProfile && (
        <button className={styles.logoutBtn} onClick={onLogout}>
          <LogoutIcon />
          Вийти
        </button>
      )}
    </div>
  );
}
