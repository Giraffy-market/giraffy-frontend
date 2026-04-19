export interface UpdateUserPayload {
  first_name?: string;
  last_name?: string;
  username?: string;
  phone_number?: string;
  avatar_url?: string;
}

export interface AvatarUploadResponse {
  avatar_url?: string;
  url?: string;
}
