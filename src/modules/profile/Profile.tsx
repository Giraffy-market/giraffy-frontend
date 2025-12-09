'use client';

import { signOut } from 'next-auth/react';

import { Loader } from '@/ui/loader/Loader';
import { ToastMessage } from '@/ui/toastMessage/toastMessages';

import { useFetchUser } from './api/profile';

import { handleApiError } from '@/shared/api/helpers/handleApiError';
import { routing } from '@/shared/routing';

import styles from './Profile.module.scss';
import ProfileDetails from './ProfileDetails/ProfileDetails';
import UserData from './UserData/UserData';

export default function UserProfilePage() {
  const { data: user, isLoading, error } = useFetchUser();

  console.log('User data: ', user);

  if (isLoading) return <Loader />;

  if (error || !user) {
    const errorMessage = handleApiError(error);
    return <ToastMessage type="error" message={errorMessage} />;
  }

  return (
    <div className="container">
      <div className={styles.profileWrapper}>
        <UserData user={user} />
        <ProfileDetails
          user={user}
          onLogout={() => signOut({ callbackUrl: routing.home.base })}
        />
      </div>
    </div>
  );
}
