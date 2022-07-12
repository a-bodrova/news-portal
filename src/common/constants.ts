export enum ENDPOINTS {
  sources = 'sources',
  everything = 'everything',
  topHeadlines = 'top-headlines/sources',
}

export enum STATUS {
  success = 200,
  clientError = 401 | 403 | 404,
  serverError = 500 | 502 | 503 | 504,
}

export enum METHODS {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
