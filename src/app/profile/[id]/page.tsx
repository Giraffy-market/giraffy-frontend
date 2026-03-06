import Profile from '@/views/profile/profile';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function UserProfileIdPage({ params }: Props) {
  const resolvedParams = await params;

  return <Profile params={resolvedParams} />;
}
