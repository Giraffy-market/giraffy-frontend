'use client';

import { notFound } from 'next/navigation';

import { ProfileDetails, UserData } from '@/modules/user/components';
import { useCurrentUser } from '@/modules/user/hooks/useCurrentUser';
import { useUserById } from '@/modules/user/hooks/useUserById';

import { Loader } from '@/components/ui/loader/Loader';

import styles from './styles/Profile.module.scss';

interface ProfileProps {
  params?: { id: string };
}

export const Profile = ({ params }: ProfileProps) => {
  const userId = params?.id;
  const {
    data: userById,
    isLoading: isLoadingId,
    error: errorId,
  } = useUserById(userId);
  const {
    data: me,
    isLoading: isLoadingMe,
    error: errorMe,
  } = useCurrentUser({
    enabled: !userId,
  });

  const user = userId ? userById : me;
  const isLoading = userId ? isLoadingId : isLoadingMe;
  const error = userId ? errorId : errorMe;

  if (isLoading) return <Loader />;
  if (error) return notFound();

  if (!user) return <div className="container">Користувача не знайдено</div>;
  return (
    <div className="container">
      <div className={styles.profileWrapper}>
        <UserData user={user} />
        <ProfileDetails user={user} />
      </div>
    </div>
  );
};
