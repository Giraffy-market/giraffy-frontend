import type { StaticImageData } from 'next/image';

type OauthAccount = {
  id: number;
  oauth_name: string;
  access_token: string;
  expires_at: number;
  refresh_token: string;
  account_id: string;
  account_email: string;
};

export type Announcement = {
  id: string;
  title: string;
  is_active: boolean;
};

export type User = {
  id: string;
  email: string;
  is_active: boolean;
  is_superuser: boolean;
  is_verified: boolean;
  username: string;
  phone_number: string;
  avatar_url: string | null;
  first_name: string | null;
  last_name: string | null;
  datetime_create: string;
  oauth_accounts: OauthAccount[];
  completed_deals: number;
  announcements: Announcement[];
  location: string | null;
  rating: number | null;
};

export type Review = {
  id: number;
  user: {
    name: string;
    avatar: string | StaticImageData;
  };
  rating: number;
  text: string;
};

export type UserDataProps = {
  user: User;
  isOwnProfile: boolean;
};

export type ProfileDetailsProps = {
  user: User;
  onLogout: () => void;
  isOwnProfile: boolean;
};

export type ReviewsListProps = {
  userId: string;
  isOwnProfile: boolean;
};
