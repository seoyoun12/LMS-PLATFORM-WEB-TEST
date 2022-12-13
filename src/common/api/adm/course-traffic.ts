import { DELETE, GET, POST } from "@common/httpClient";
import useSWR, { SWRResponse } from "swr";
import { PaginationResult } from "types/fetch";
import {
  ProvincialBoardResponseDto,
  ProvincialBoardSaveRequestDto,
} from "../Api";

// export interface CourseTraffic {
//   totalElements: number;
//   totalPages: number;
// }

export enum TargetMainType {
  TYPE_CHILDREN = "TYPE_CHILDREN",
  TYPE_TEENAGER = "TYPE_TEENAGER",
  TYPE_ELDERLY = "TYPE_ELDERLY",
  TYPE_SELF_DRIVING = "TYPE_SELF_DRIVING",
}

export enum TargetSubType {
  TYPE_KINDERGARTEN = "TYPE_KINDERGARTEN",
  TYPE_ELEMENTARY = "TYPE_ELEMENTARY",
  TYPE_MIDDLE = "TYPE_MIDDLE",
  TYPE_HIGH = "TYPE_HIGH",
  TYPE_SELF_DRIVER = "TYPE_SELF_DRIVER",
  TYPE_ELDERLY = "TYPE_ELDERLY",
}

export function courseTrafficList({
  elementCnt,
  page,
}: {
  elementCnt?: number;
  page: number;
}) {
  const { data, error, mutate } = useSWR<
    SWRResponse<PaginationResult<ProvincialBoardResponseDto[]>>
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

// upload
export async function courseTrafficUpload(
  courseTrafficInput: ProvincialBoardSaveRequestDto
) {
  return await POST(`/provincial/board/adm`, courseTrafficInput);
}

// remove
export async function courseTrafficRemove(boardSeq: number) {
  return await DELETE(`/provincial/board/adm/${boardSeq}`);
}
