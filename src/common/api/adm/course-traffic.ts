import { GET } from "@common/httpClient";
import useSWR, { SWRResponse } from "swr";
import { PaginationResult } from "types/fetch";

export interface CourseTraffic {
  totalElements: number;
  totalPages: number;
}

export function courseTrafficList({
  elementCnt,
  page,
}: {
  elementCnt?: number;
  page: number;
}) {
  const { data, error, mutate } = useSWR<
    SWRResponse<PaginationResult<CourseTraffic[]>>
  >(
    [
      `/provincial/board/adm`,
      {
        params: { elementCnt, page },
      },
    ],
    GET
  );

  return {
    data: data?.data,
    error,
    mutate,
  };
}
