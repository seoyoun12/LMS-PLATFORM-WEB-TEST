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

export interface SwrResponse<T> {
  data: T;
  isLoading: boolean;
  isError: any;
}

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

type GetSSRResult<TProps> =
//
  { props: TProps } | { redirect: any } | { notFound: boolean };

type GetSSRFn<TProps> = (...args: any[]) => Promise<GetSSRResult<TProps>>;

export type inferSSRProps<TFn extends GetSSRFn<any>> = TFn extends GetSSRFn<infer TProps>
  ? NonNullable<TProps>
  : never;


export const JSON_SERVER = 'http://localhost:8080';
