export type HttpClientErrorStatuses = 400 | 401 | 403 | 404 | 409 | 422;
export type HttpServerErrorStatuses = 500;

export type HttpStatuses = HttpClientErrorStatuses | HttpServerErrorStatuses;
