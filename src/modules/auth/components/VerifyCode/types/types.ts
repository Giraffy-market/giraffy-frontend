export type VerifyFormValues = {
  email: string;
  kod: string;
};

export type ResendFormValues = {
  email: string;
};

export interface VerifyResponse {
  status: string;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    user_id: string | number;
    email: string;

    token?: string;
  };
}
