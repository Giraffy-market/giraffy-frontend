export type HttpErrorType = {
  detail?: string;
  error?: {
    type: string;
    message: string | string[];
  };
};

export class HttpError extends Error {
  status: number;
  data?: HttpErrorType;

  constructor(status: number, data?: HttpErrorType) {
    const message =
      data?.detail ||
      (Array.isArray(data?.error?.message)
        ? data.error.message.join(', ')
        : data?.error?.message) ||
      'HTTP Error';
    super(message);

    this.name = 'HttpError';
    this.status = status;
    this.data = data;

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
