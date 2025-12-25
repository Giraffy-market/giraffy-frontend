import Profile from '@/views/profile/profile';

interface Props {
  params: { id: string };
}

export default function UserProfileIdPage({ params }: Props) {
  return <Profile params={params} />;
}
