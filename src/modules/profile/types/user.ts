type OauthAccount = {
  id: number;
  oauth_name: string;
  access_token: string;
  expires_at: number;
  refresh_token: string;
  account_id: string;
  account_email: string;
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
};
