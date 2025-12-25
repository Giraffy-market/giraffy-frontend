import type { User } from './user';

export type UserDataProps = {
  user: User;
  isOwnProfile?: boolean;
};

export type ProfileDetailsProps = {
  user: User;
  onLogout?: () => void;
  isOwnProfile?: boolean;
};

export type ReviewsListProps = {
  userId: string;
  isOwnProfile: boolean;
};
