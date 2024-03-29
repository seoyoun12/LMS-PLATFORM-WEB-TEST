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
  map(
    arg0: (data: any) => import("@emotion/react/jsx-runtime").JSX.Element
  ): import("react").ReactNode;
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
      empty: boolean;
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

export enum STATUS_CODE {
  NOT_FOUND = 404,
  AUTHORIZATION_LOCKED = 400,
  ACCESS_TOKEN_EXPIRED = 999,
  REFRESH_TOKEN_EXPIRED = 998,
}

export enum FetchingStatus {
  PENDING = "pending",
  LOADING = "loading",
  RESOLVED = "resolved",
  REJECTED = "rejected",
}

export type FetchState = "READY" | "FETCHING" | "SUCCESS" | "FAILURE";
