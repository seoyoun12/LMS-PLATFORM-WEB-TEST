import { string } from 'prop-types';

export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';

export interface FetchResponse<T> {
  data: T;
  message: string;
  status: number;
  success: boolean;
}

export interface FetchPaginationResponse<T> {
  data: PaginationResult<T>;
  message: string;
  status: number;
  success: boolean;
}

export interface PaginationResult<T> {
  content: T;
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: {
    offset: number;
    pageSize: number;
    pageNumber: number;
    paged: boolean;
    unpaged: boolean;
    sort: {
      unsorted: boolean;
      sorted: boolean;
      empty: boolean
    };
  };
  size: number;
  sort: {
    unsorted: boolean;
    sorted: boolean;
    empty: boolean;
  };
  totalElements: number;
  totalPages: number;
}

export interface SWRResponse<T> {
  data: T;
  error: any;
  loading?: boolean;
}

export enum STATUS_CODE {
  NOT_FOUND = 404,
  ACCESS_TOKEN_EXPIRED = 999,
  REFRESH_TOKEN_EXPIRED = 998
}

export interface File {
  downloadCnt?: number;
  name?: string;
  path?: string;
  realName?: string;
  seq?: number;
  size?: number;
  type?: 'video/mp4';
}

export interface Files extends Array<File> {
}

export enum FetchingStatus {
  PENDING = 'pending',
  LOADING = 'loading',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}

export enum YN {
  YES = 'Y',
  NO = 'N'
}

type GetSSRResult<TProps> =
//
  { props: TProps } | { redirect: any } | { notFound: boolean };

type GetSSRFn<TProps> = (...args: any[]) => Promise<GetSSRResult<TProps>>;

export type inferSSRProps<TFn extends GetSSRFn<any>> = TFn extends GetSSRFn<infer TProps>
  ? NonNullable<TProps>
  : never;

export const JSON_SERVER = 'http://localhost:8080';
