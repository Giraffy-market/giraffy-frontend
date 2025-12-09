import { signOut, useSession } from 'next-auth/react';

import ProfileDetails from '@/modules/profile/ProfileDetails/ProfileDetails';
import ReviewsList from '@/modules/profile/ReviewsList/ReviewsList';
import UserData from '@/modules/profile/UserData/UserData';

import { Loader } from '@/ui/loader/Loader';
import { ToastMessage } from '@/ui/toastMessage/toastMessages';

import { useFetchUser } from './api/profile';

import { handleApiError } from '@/shared/api/helpers/handleApiError';
import { routing } from '@/shared/routing';

export default function UserProfileByIdPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: session } = useSession();
  const { data: user, isLoading, error } = useFetchUser(params.id);

  console.log('User data: ', user);

  if (isLoading) return <Loader />;
  if (error || !user) {
    const errorMessage = handleApiError(error);
    return <ToastMessage type="error" message={errorMessage} />;
  }

  const isOwnProfile = session?.user?.id === user.id;

  return (
    <div className="container">
      <div className="profile-page-wrapper">
        <UserData user={user} isOwnProfile={isOwnProfile} />
        <ProfileDetails
          user={user}
          isOwnProfile={isOwnProfile}
          onLogout={() => signOut({ callbackUrl: routing.home.base })}
        />
        <ReviewsList userId={user.id} isOwnProfile={isOwnProfile} />
      </div>
    </div>
  );
}
