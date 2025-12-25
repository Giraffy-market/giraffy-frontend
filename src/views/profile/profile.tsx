'use client';

import Profile from '@/modules/profile/Profile';

interface ProfilePageProps {
  params?: { id: string };
}

const ProfilePage = ({ params }: ProfilePageProps) => (
  <Profile params={params} />
);

export default ProfilePage;
