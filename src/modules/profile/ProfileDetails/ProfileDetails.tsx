import LogoutIcon from '@/components/prifile/assets/logout.svg';
import PencilIcon from '@/components/prifile/assets/pencil.svg';

import type { User } from '../types/user';

import ReviewsList from '../ReviewsList/ReviewsList';
import styles from './ProfileDetails.module.scss';

type ProfileDetailsProps = {
  user: User;
  onLogout: () => void;
};

export default function ProfileDetails({
  user,
  onLogout,
}: ProfileDetailsProps) {
  return (
    <div className={styles.profileDetails}>
      <div className={styles.descriptionsWrapper}>
        <div className={styles.titleWrapper}>
          <h3 className={styles.title}>Дані профілю</h3>
          <button className={styles.editButton} disabled>
            Редагувати
            <PencilIcon />
          </button>
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

      <ReviewsList />

      <button className={styles.logoutBtn} onClick={onLogout}>
        <LogoutIcon />
        Вийти
      </button>
    </div>
  );
}
