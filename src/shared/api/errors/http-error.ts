export type HttpErrorType = {
  detail: string;
};

export class HttpError extends Error {
  status: number;
  data?: HttpErrorType;
  detail?: string;

  constructor(status: number, data?: HttpErrorType) {
    super(data?.detail || 'HTTP Error');

    this.name = 'HttpError';
    this.status = status;
    this.data = data;
    this.detail = data?.detail;

    Object.setPrototypeOf(this, HttpError.prototype);
  }
}
