export type LoginResponse = {
  user_id: string;
  access_token: string;
  refresh_token: string;
  token_type: string;
  expired_in: number;
};
