export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';

export enum STATUS_CODE {
  NOT_FOUND = 404,
  ACCESS_TOKEN_EXPIRED = 999,
  REFRESH_TOKEN_EXPIRED = 998
}

export enum FetchingStatus {
  PENDING = 'pending',
  LOADING = 'loading',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}

export const JSON_SERVER = 'http://localhost:8080';
