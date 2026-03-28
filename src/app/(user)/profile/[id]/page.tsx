import { Profile } from '@/views/profile/Profile';

export default async function UserProfileIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;

  return <Profile params={resolvedParams} />;
}
