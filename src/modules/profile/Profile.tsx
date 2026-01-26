'use client';

import { Loader } from '@/components/ui/loader/Loader';
import { ToastMessage } from '@/components/ui/toastMessage/toastMessages';

import { useFetchUser } from './api/profile';

import { handleApiError } from '@/shared/api/helpers/handleApiError';

import styles from './Profile.module.scss';
import ProfileDetails from './ProfileDetails/ProfileDetails';
import UserData from './UserData/UserData';

interface Props {
  params?: { id: string };
}

export default function UserProfilePage({ params }: Props) {
  const { data: user, isLoading, error } = useFetchUser(params?.id);

  if (isLoading) return <Loader />;

  if (error || !user) {
    const errorMessage = handleApiError(error);
    return <ToastMessage type="error" message={errorMessage} />;
  }

  return (
    <div className="container">
      <div className={styles.profileWrapper}>
        <UserData user={user} />
        <ProfileDetails user={user} />
      </div>
    </div>
  );
}
